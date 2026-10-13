"use client";

import { useEffect, useState } from "react";
import { X, Check, Lock } from "lucide-react";
import { CreditIcon } from "@/components/ui/CreditIcon";
import { getBilling } from "@/lib/api/billing";
import { apiErrorDetail } from "@/lib/api/authed-fetch";
import { checkoutCreditPack, checkoutSubscription, switchSubscription } from "@/lib/api/checkout";
import { loadRazorpayCheckout, openRazorpayCheckout } from "@/lib/razorpay/checkout";
import type { BillingPlan, BillingResponse } from "@/lib/types/billing";
import { useTeam } from "@/lib/studio/TeamContext";
import { useTeamBilling } from "@/lib/studio/TeamBillingContext";
import { useToast } from "@/lib/studio/ToastContext";
import { formatDate, formatExpiry } from "@/lib/studio/date-format";
import { useNow } from "@/lib/studio/use-now";

function formatRupees(paise: number) {
  return (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

/** Price of one credit, in rupees, e.g. "16.67". */
function perCredit(paise: number, credits: number) {
  return (paise / 100 / credits).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Positive when `a` bills over a longer period than `b` (week < month < year). */
function comparePeriod(a: BillingPlan, b: BillingPlan) {
  if (a.billingPeriodDays != null && b.billingPeriodDays != null) return a.billingPeriodDays - b.billingPeriodDays;
  return a.sortOrder - b.sortOrder;
}

export function BuyCreditsModal() {
  const { activeTeamId, activeTeam } = useTeam();
  const { billing: teamBilling, buyModalOpen, buyModalTab, closeBuyModal, refetch } = useTeamBilling();
  const { say } = useToast();
  const now = useNow();
  const [tab, setTab] = useState<"sub" | "credits">(buyModalTab);
  const [billing, setBilling] = useState<BillingResponse>({ subscriptions: [], credits: [] });
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  // The plan whose "Upgrade" is awaiting confirmation.
  const [confirmId, setConfirmId] = useState<string | null>(null);
  // After a successful payment, the backend credits the account via a
  // webhook that isn't instant — a single delayed refetch left the pill
  // showing the old total for up to a minute with no feedback. This polls
  // until the total actually changes (or gives up after a minute, at which
  // point TeamBillingContext's own background refresh will pick it up).
  // After paying for an upgrade the plan doesn't change until the backend
  // confirms it; this polls the billing status until the pending switch is
  // gone AND the plan has actually changed.
  const [awaitingSwitch, setAwaitingSwitch] = useState<{ targetSlug: string; targetName: string; startedAt: number } | null>(
    null,
  );
  const [awaitingCredit, setAwaitingCredit] = useState<{ prevCredits: number; startedAt: number } | null>(
    null,
  );

  // Phones: the plan/pack picked in the tile grid (the sticky button buys it).
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isOwner = activeTeam?.role === "owner";

  // Reset the local tab to whichever one the opener asked for, each time the
  // modal transitions from closed to open (adjusting state during render
  // instead of an effect, since this is a pure derivation of a prop change).
  const [wasOpen, setWasOpen] = useState(buyModalOpen);
  if (buyModalOpen !== wasOpen) {
    setWasOpen(buyModalOpen);
    if (buyModalOpen) {
      setTab(buyModalTab);
      setConfirmId(null);
    }
  }

  useEffect(() => {
    if (!buyModalOpen) return;
    // Fetching plans when the modal opens is exactly what this effect is
    // for; the lint rule flags the loading-flag set that precedes the fetch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    getBilling()
      .then(setBilling)
      .finally(() => setLoading(false));
  }, [buyModalOpen]);

  useEffect(() => {
    if (!awaitingCredit) return;
    if (teamBilling && teamBilling.totalCredits !== awaitingCredit.prevCredits) {
      say(`Credits added — you now have ${teamBilling.totalCredits}.`);
      // Reacting to teamBilling (an external value from context) changing —
      // exactly the "subscribe to an external system" case the rule allows.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAwaitingCredit(null);
      return;
    }
    if (Date.now() - awaitingCredit.startedAt > 60_000) {
      setAwaitingCredit(null);
      return;
    }
    const t = setTimeout(refetch, 2000);
    return () => clearTimeout(t);
  }, [awaitingCredit, teamBilling, refetch, say]);

  useEffect(() => {
    if (!awaitingSwitch) return;
    const planNow = teamBilling?.plan?.toLowerCase();
    const switched = !teamBilling?.pendingSwitch && planNow === awaitingSwitch.targetSlug.toLowerCase();
    if (switched) {
      say(`Switched to ${awaitingSwitch.targetName}.`);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reacting to the external billing status changing
      setAwaitingSwitch(null);
      return;
    }
    if (Date.now() - awaitingSwitch.startedAt > 60_000) {
      say("We're still confirming your payment. Your current plan stays active until it goes through.");
      setAwaitingSwitch(null);
      return;
    }
    const t = setTimeout(refetch, 2000);
    return () => clearTimeout(t);
  }, [awaitingSwitch, teamBilling, refetch, say]);

  if (!buyModalOpen) return null;

  const currentKey = teamBilling?.plan?.toLowerCase();
  const matchesTeamPlan = (p: BillingPlan) =>
    tab === "sub" && !!currentKey && (p.slug.toLowerCase() === currentKey || p.name.toLowerCase() === currentKey);
  // A subscription that was started but never paid (checkout closed) is not
  // "active" — it is treated as no subscription at all.
  const subActive = teamBilling?.subscriptionStatus?.toLowerCase() === "active";
  const isCurrentPlan = (p: BillingPlan) => matchesTeamPlan(p) && subActive;

  const plans = (tab === "sub" ? billing.subscriptions : billing.credits)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Once a team is subscribed, "best value" styling is dropped: the only card
  // that should stand out is the one they already own, and it must read as
  // "already yours", not as the recommended thing to click.
  const ownsPlan = plans.some(isCurrentPlan);
  const currentPlan = plans.find(isCurrentPlan) ?? null;
  const periodEnd = formatDate(teamBilling?.currentPeriodEnd);
  // An upgrade waiting on payment (ignored once it has expired).
  const pending = teamBilling?.pendingSwitch;
  const pendingSlug =
    pending?.plan && (!pending.expiresAt || new Date(pending.expiresAt).getTime() > now)
      ? pending.plan.toLowerCase()
      : null;


  // Phone selection: the tapped tile, else the popular / first plan the team doesn't already own.
  const mSel =
    plans.find((p) => p.id === selectedId) ??
    plans.find((p) => p.isPopular && !isCurrentPlan(p)) ??
    plans.find((p) => !isCurrentPlan(p)) ??
    plans[0] ??
    null;
  const mRel = mSel && tab === "sub" && currentPlan && !isCurrentPlan(mSel) ? comparePeriod(mSel, currentPlan) : 0;
  const mCurrent = !!mSel && isCurrentPlan(mSel);
  const mUpgrade = mRel > 0;
  const mLocked = mRel < 0;
  const mAwaiting = !!mSel && tab === "sub" && !mCurrent && pendingSlug === mSel.slug.toLowerCase();
  const mConfirming = !!mSel && confirmId === mSel.id;
  const bestValueId = plans.reduce<BillingPlan | null>(
    (best, p) => (!best || comparePeriod(p, best) > 0 ? p : best),
    null,
  )?.id;
  const mCanBuy = isOwner && !mCurrent && !mLocked && !mAwaiting && buyingId === null;

  async function handleBuy(plan: BillingPlan) {
    if (!activeTeamId || !isOwner || buyingId) return;
    setBuyingId(plan.id);
    setConfirmId(null);
    try {
      await loadRazorpayCheckout();
      if (tab === "credits") {
        const checkout = await checkoutCreditPack(activeTeamId, plan.id);
        openRazorpayCheckout({
          key: checkout.key_id,
          amount: checkout.amount,
          currency: checkout.currency,
          order_id: checkout.order_id,
          name: "ShootPX",
          description: `${plan.name} — ${plan.credits} credits`,
          theme: { color: "#c8ff00" },
          handler: () => {
            closeBuyModal();
            say("Payment submitted — crediting your account…");
            setAwaitingCredit({ prevCredits: teamBilling?.totalCredits ?? 0, startedAt: Date.now() });
          },
          modal: { ondismiss: () => say("Checkout cancelled") },
        });
      } else {
        // Changing plans on an active subscription goes through /switch; the
        // plain checkout is only for teams without one.
        const isSwitch = subActive;
        const checkout = isSwitch
          ? await switchSubscription(activeTeamId, plan.id)
          : await checkoutSubscription(activeTeamId, plan.id);
        if (isSwitch) {
          say("Complete payment to finish upgrading");
          refetch(); // picks up pendingSwitch so the target card shows "Waiting for payment"
        }
        openRazorpayCheckout({
          key: checkout.key_id,
          subscription_id: checkout.razorpay_subscription_id,
          name: "ShootPX",
          description: `${plan.name} subscription`,
          theme: { color: "#c8ff00" },
          handler: () => {
            closeBuyModal();
            if (isSwitch) {
              say("Payment submitted — confirming your upgrade…");
              setAwaitingSwitch({ targetSlug: plan.slug, targetName: plan.name, startedAt: Date.now() });
            } else {
              say("Payment submitted — activating your subscription…");
              setAwaitingCredit({ prevCredits: teamBilling?.totalCredits ?? 0, startedAt: Date.now() });
            }
          },
          modal: {
            ondismiss: () => {
              say("Checkout cancelled");
              if (isSwitch) refetch(); // the unpaid upgrade stays pending until it expires
            },
          },
        });
      }
    } catch (err) {
      say(apiErrorDetail(err, "Couldn't start checkout. Please try again."));
    } finally {
      setBuyingId(null);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-auto overscroll-contain bg-bg">

      {/* ---- Phones: tab bar, balance, tile grid, pinned buy button ---- */}
      <div className="flex h-full flex-col md:hidden">
        <div className="flex flex-none items-center border-b border-border pr-4">
          <button onClick={closeBuyModal} aria-label="Close" className="flex h-12 w-12 items-center justify-center text-text">
            <X size={22} />
          </button>
          <div className="flex flex-1 justify-center gap-7">
            {(["sub", "credits"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setConfirmId(null);
                }}
                className={`border-b-2 py-3.5 text-[15px] font-semibold ${
                  tab === t ? "border-accent text-text" : "border-transparent text-dim"
                }`}
              >
                {t === "sub" ? "Subscription" : "Credits"}
              </button>
            ))}
          </div>
          <span className="w-8" />
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-4">
          {!isOwner && (
            <p className="mb-3 text-center text-[13px] text-accent">Only the team owner can buy credits or manage subscriptions.</p>
          )}

          {tab === "credits" && (
            <div className="mb-5 rounded-2xl border border-border bg-surface p-4">
              <div className="font-mono text-[10.5px] tracking-wide text-muted">MY CREDITS</div>
              <div className="mt-1 flex items-center gap-2 font-heading text-[34px] font-bold leading-none">
                <CreditIcon size={28} />
                {(teamBilling?.totalCredits ?? 0).toLocaleString("en-IN")}
              </div>
              {teamBilling && (
                <div className="mt-2 text-[12.5px] text-muted">
                  Plan {teamBilling.subscriptionCredits} · Top-up {teamBilling.topupCredits}
                </div>
              )}
            </div>
          )}

          {tab === "sub" && (
            <h2 className="mb-4 font-heading text-[26px] font-bold leading-tight tracking-tight">
              Pick a plan. <span className="text-accent">Shoot more.</span>
            </h2>
          )}

          {loading ? (
            <p className="mt-10 text-center text-sm text-dim">Loading plans…</p>
          ) : plans.length === 0 ? (
            <p className="mt-10 text-center text-sm text-dim">Couldn&apos;t load plans right now.</p>
          ) : (
            <>
              <h3 className="mb-3 text-[15px] font-semibold">{tab === "credits" ? "Buy credits" : "Choose your plan"}</h3>
              {tab === "sub" ? (
                <div className="flex flex-col gap-2.5">
                  {plans.map((plan) => {
                    const picked = plan.id === mSel?.id;
                    const isCur = isCurrentPlan(plan);
                    const bestValue = plans.length > 1 && plan.id === bestValueId && !isCur;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => {
                          setSelectedId(plan.id);
                          setConfirmId(null);
                        }}
                        aria-pressed={picked}
                        className={`relative flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-colors ${
                          picked ? "border-accent bg-accent/10" : "border-border bg-surface"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${
                            picked ? "border-accent" : "border-border-strong"
                          }`}
                        >
                          {picked && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="font-heading text-[16px] font-semibold">{plan.name}</span>
                            {(isCur || bestValue || plan.isPopular) && (
                              <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wide text-accent-ink">
                                {isCur ? "CURRENT" : bestValue ? "BEST VALUE" : "POPULAR"}
                              </span>
                            )}
                          </span>
                          <span className="mt-1 flex items-center gap-1.5 text-[12.5px] text-muted">
                            <CreditIcon size={12} />
                            {plan.credits.toLocaleString("en-IN")} credits / {plan.periodLabel}
                          </span>
                        </span>
                        <span className="flex-none text-right">
                          <span className="block font-heading text-[20px] font-bold leading-none text-text">
                            ₹{formatRupees(plan.price)}
                          </span>
                          {plan.credits > 0 && (
                            <span className="mt-1 block text-[11px] text-muted">₹{perCredit(plan.price, plan.credits)} / credit</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
              <div className="grid grid-cols-2 gap-3">
                {plans.map((plan) => {
                  const picked = plan.id === mSel?.id;
                  const isCur = isCurrentPlan(plan);
                  return (
                    <button
                      key={plan.id}
                      onClick={() => {
                        setSelectedId(plan.id);
                        setConfirmId(null);
                      }}
                      aria-pressed={picked}
                      className={`relative flex flex-col overflow-hidden rounded-2xl border text-left transition-colors ${
                        picked ? "border-accent bg-surface-2" : "border-border bg-surface"
                      }`}
                    >
                      {(plan.isPopular || isCur) && (
                        <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wide text-accent-ink">
                          {isCur ? "CURRENT" : "POPULAR"}
                        </span>
                      )}
                      <div className="flex flex-col items-center gap-1 px-3 pb-3 pt-8">
                        <span className="font-heading text-[13px] text-muted">{plan.name}</span>
                        <span className="flex items-center gap-1.5 font-heading text-[26px] font-bold leading-none">
                          <CreditIcon size={18} />
                          {plan.credits.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] text-muted">
                          {tab === "credits" && plan.credits > 0
                            ? `₹${perCredit(plan.price, plan.credits)} / credit`
                            : `credits ${plan.periodLabel}`}
                        </span>
                      </div>
                      <div className={`px-3 py-2.5 text-center text-[15px] font-semibold ${picked ? "bg-accent text-accent-ink" : "bg-bg/60"}`}>
                        ₹{formatRupees(plan.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
              )}

              {mSel && mSel.info.length > 0 && (
                <div className="mt-5 flex flex-col gap-2.5 rounded-2xl border border-border bg-surface p-4">
                  <span className="font-mono text-[11px] text-muted">{mSel.name.toUpperCase()} INCLUDES</span>
                  {mSel.info.map((f) => (
                    <span key={f} className="flex gap-2.5 text-[13.5px] leading-snug">
                      <Check size={15} className="mt-0.5 flex-none text-accent" />
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {mSel && (
          <div className="flex-none border-t border-border bg-bg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
            {mConfirming ? (
              <>
                <p className="mb-2 text-center text-[12px] text-muted">Your current plan stays active until payment completes.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmId(null)}
                    className="h-12 flex-1 rounded-full border border-border-strong text-[14px] font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleBuy(mSel)}
                    className="h-12 flex-1 rounded-full bg-accent text-[14px] font-semibold text-accent-ink"
                  >
                    Confirm upgrade
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => (mUpgrade ? setConfirmId(mSel.id) : handleBuy(mSel))}
                  disabled={!mCanBuy}
                  className={`flex h-12 w-full items-center justify-center gap-1.5 rounded-full text-[15px] font-semibold ${
                    mCanBuy ? "bg-accent text-accent-ink active:bg-accent-hover" : "border border-border-strong text-muted"
                  }`}
                >
                  {!isOwner ? (
                    <>
                      <Lock size={14} /> Owner only
                    </>
                  ) : mCurrent ? (
                    <>
                      <Check size={15} /> Current plan
                    </>
                  ) : mAwaiting ? (
                    "Waiting for payment"
                  ) : mLocked ? (
                    periodEnd ? `Available after ${periodEnd}` : "Available after this period"
                  ) : buyingId === mSel.id ? (
                    "Opening checkout…"
                  ) : tab === "credits" ? (
                    `Purchase now · ₹${formatRupees(mSel.price)}`
                  ) : mUpgrade ? (
                    `Upgrade · ₹${formatRupees(mSel.price)}`
                  ) : (
                    `Subscribe · ₹${formatRupees(mSel.price)}`
                  )}
                </button>
                <p className="mt-2 text-center text-[11.5px] text-dim">
                  Commercial licence included.{tab === "sub" ? " Cancel anytime." : ""}
                </p>
              </>
            )}
          </div>
        )}
      </div>
      <button
        onClick={closeBuyModal}
        className="fixed right-3 top-3 z-[61] max-md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-surface text-dim hover:text-text md:right-7 md:top-5 md:bg-transparent"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div className="mx-auto flex min-h-full max-w-6xl flex-col items-center max-md:hidden justify-start gap-2.5 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-14 md:px-6 md:py-10">
        <h2 className="text-center font-heading text-[clamp(26px,3.2vw,36px)] font-bold tracking-tight">
          More credits, more shoots.
        </h2>
        <p className="max-w-[80ch] text-center text-sm text-muted">
          Buy credits when you need them, or subscribe for a steady supply. Commercial licence
          included on every plan.
        </p>
        {!isOwner && (
          <p className="text-center text-[13px] text-accent">
            Only the team owner can buy credits or manage subscriptions.
          </p>
        )}

        <div className="mt-2 grid w-full max-w-[320px] grid-cols-2 gap-0.5 rounded-full border border-border bg-surface p-1 md:w-auto">
          <button
            onClick={() => {
              setTab("sub");
              setConfirmId(null);
            }}
            className={`rounded-full px-5 py-2 text-[13.5px] font-semibold ${
              tab === "sub" ? "bg-accent text-accent-ink" : "text-muted"
            }`}
          >
            Subscription
          </button>
          <button
            onClick={() => {
              setTab("credits");
              setConfirmId(null);
            }}
            className={`rounded-full px-5 py-2 text-[13.5px] font-semibold ${
              tab === "credits" ? "bg-accent text-accent-ink" : "text-muted"
            }`}
          >
            Credits
          </button>
        </div>

        {loading ? (
          <p className="mt-10 text-sm text-dim">Loading plans…</p>
        ) : plans.length === 0 ? (
          <p className="mt-10 text-sm text-dim">Couldn&apos;t load plans right now.</p>
        ) : (
          // One horizontal row for any number of plans — scrolls sideways once
          // there are more than fit, and centres while they do fit.
          // On phones the plans stack full-width (no sideways scrolling); from md up
          // they sit in one row.
          <div className="mt-4 w-full pb-6 pt-1 md:mt-5 md:overflow-x-auto md:pb-2">
            <div className="mx-auto flex w-full flex-col gap-3.5 md:w-max md:flex-row md:gap-4">
              {plans.map((plan) => {
                const current = isCurrentPlan(plan);
                const featured = !!plan.isPopular && !ownsPlan;
                const isBuying = buyingId === plan.id;
                const confirming = confirmId === plan.id;
                // With an active subscription, other plans are an upgrade
                // (longer period) or unavailable until the period ends.
                const relation = tab === "sub" && currentPlan && !current ? comparePeriod(plan, currentPlan) : 0;
                const upgrade = relation > 0;
                const lockedUntilRenewal = relation < 0;
                const awaitingPayment = tab === "sub" && !current && pendingSlug === plan.slug.toLowerCase();
                const ctaBase =
                  "flex h-11 items-center justify-center gap-1.5 rounded-full text-[13.5px] font-semibold disabled:cursor-not-allowed";
                return (
                  <div
                    key={plan.id}
                    aria-disabled={!isOwner}
                    className={`relative flex w-full flex-none flex-col gap-3 rounded-2xl border p-4 md:w-[250px] md:p-5 ${
                      current
                        ? "border-border-strong bg-surface-2"
                        : featured
                          ? "border-accent bg-surface"
                          : "border-border bg-bg"
                    } ${!isOwner ? "cursor-not-allowed opacity-60 grayscale-[40%]" : ""}`}
                  >
                    {/* Reserved on every card so titles, prices and buttons line up. */}
                    <div className="md:h-6">
                      {plan.isPopular && (
                        <span className="inline-flex items-center rounded-full border border-accent px-2.5 py-1 font-mono text-[10px] leading-none tracking-wide text-accent">
                          MOST POPULAR
                        </span>
                      )}
                    </div>
                    {/* Phones: name + credits on the left, price on the right. */}
                    <div className="flex items-start justify-between gap-3 md:flex-col md:justify-start md:gap-3">
                      <div>
                        <div className="font-heading text-lg font-semibold">{plan.name}</div>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                          <CreditIcon size={12} />
                          {plan.credits} credits
                        </div>
                      </div>
                      <div className="text-right md:text-left">
                        <span className="font-heading text-[26px] font-bold leading-none tracking-tight text-accent md:text-[28px]">
                          ₹{formatRupees(plan.price)}
                        </span>
                        <div className="mt-1 text-xs text-muted md:mt-0 md:inline">
                          <span className="hidden md:inline"> </span>
                          {tab === "credits" ? "one-time" : plan.periodLabel}
                        </div>
                        {tab === "credits" && plan.credits > 0 && (
                          <div className="mt-0.5 text-xs text-muted md:mt-1">₹{perCredit(plan.price, plan.credits)} per credit</div>
                        )}
                      </div>
                    </div>

                    {confirming ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setConfirmId(null)}
                          className={`${ctaBase} flex-1 border border-border-strong hover:border-accent`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleBuy(plan)}
                          className={`${ctaBase} flex-1 bg-accent text-accent-ink hover:bg-accent-hover`}
                        >
                          Confirm
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => (upgrade ? setConfirmId(plan.id) : handleBuy(plan))}
                        disabled={!isOwner || current || lockedUntilRenewal || awaitingPayment || buyingId !== null}
                        title={!isOwner ? "Only the team owner can buy" : current ? "This is your current plan" : undefined}
                        className={`${ctaBase} w-full ${
                          current || lockedUntilRenewal || awaitingPayment
                            ? "border border-border-strong bg-bg/40 text-muted"
                            : !isOwner
                              ? "border border-border text-muted"
                              : featured
                                ? "bg-accent text-accent-ink hover:bg-accent-hover disabled:opacity-50"
                                : "border border-border-strong hover:border-accent disabled:opacity-50"
                        } ${lockedUntilRenewal ? "text-[12.5px]" : ""}`}
                      >
                        {current ? (
                          <>
                            <Check size={14} /> Current plan
                          </>
                        ) : !isOwner ? (
                          <>
                            <Lock size={13} /> Owner only
                          </>
                        ) : awaitingPayment ? (
                          "Waiting for payment"
                        ) : lockedUntilRenewal ? (
                          periodEnd ? `Available after ${periodEnd}` : "Available after this period"
                        ) : isBuying ? (
                          "Opening checkout…"
                        ) : upgrade ? (
                          "Upgrade"
                        ) : (
                          "Get started"
                        )}
                      </button>
                    )}

                    {/* Reserved line under the button (subscriptions only) so the lists stay aligned. */}
                    {tab === "sub" && (
                      <p className="-mt-1 text-center text-[11.5px] leading-snug text-muted empty:hidden md:block md:h-8 md:empty:block">
                        {confirming
                          ? "Your current plan stays active until payment completes."
                          : awaitingPayment
                            ? `Waiting for payment${formatExpiry(pending?.expiresAt) ? ` · expires ${formatExpiry(pending?.expiresAt)}` : ""}`
                            : current
                              ? `Active${periodEnd ? ` · renews ${periodEnd}` : ""}`
                              : ""}
                      </p>
                    )}

                    <div className="flex flex-col gap-1.5 border-t border-border pt-3">
                      <span className="font-mono text-[11px] text-muted">INCLUDES</span>
                      {plan.info.map((f, i) => (
                        <span key={f} className={`gap-2 text-[12.5px] text-muted ${i >= 3 ? "hidden md:flex" : "flex"}`}>
                          <Check size={13} className="mt-0.5 flex-none text-accent" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
