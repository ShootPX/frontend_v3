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
    <div className="fixed inset-0 z-[60] overflow-auto bg-bg">
      <button
        onClick={closeBuyModal}
        className="fixed right-7 top-5 z-[61] text-dim hover:text-text"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <div className="mx-auto flex min-h-full max-w-6xl flex-col items-center justify-start gap-2.5 px-6 py-10">
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

        <div className="mt-2 flex gap-0.5 rounded-full border border-border bg-surface p-1">
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
          <div className="mt-5 w-full overflow-x-auto pb-2 pt-1">
            <div className="mx-auto flex w-max gap-4">
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
                    className={`relative flex w-[250px] flex-none flex-col gap-3 rounded-2xl border p-5 ${
                      current
                        ? "border-border-strong bg-surface-2"
                        : featured
                          ? "border-accent bg-surface"
                          : "border-border bg-bg"
                    } ${!isOwner ? "cursor-not-allowed opacity-60 grayscale-[40%]" : ""}`}
                  >
                    {/* Reserved on every card so titles, prices and buttons line up. */}
                    <div className="h-6">
                      {plan.isPopular && (
                        <span className="inline-flex items-center rounded-full border border-accent px-2.5 py-1 font-mono text-[10px] leading-none tracking-wide text-accent">
                          MOST POPULAR
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-heading text-lg font-semibold">{plan.name}</div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                        <CreditIcon size={12} />
                        {plan.credits} credits
                      </div>
                    </div>
                    <div>
                      <span className="font-heading text-[28px] font-bold leading-none tracking-tight text-accent">
                        ₹{formatRupees(plan.price)}
                      </span>
                      <span className="text-xs text-muted"> {tab === "credits" ? "one-time" : plan.periodLabel}</span>
                      {tab === "credits" && plan.credits > 0 && (
                        <div className="mt-1 text-xs text-muted">₹{perCredit(plan.price, plan.credits)} per credit</div>
                      )}
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
                      <p className="-mt-1 h-8 text-center text-[11.5px] leading-snug text-muted">
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
                      {plan.info.map((f) => (
                        <span key={f} className="flex gap-2 text-[12.5px] text-muted">
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
