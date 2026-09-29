"use client";

import { useEffect, useState } from "react";
import { CreditIcon } from "@/components/ui/CreditIcon";
import { useTeam } from "@/lib/studio/TeamContext";
import { useTeamBilling } from "@/lib/studio/TeamBillingContext";
import { useToast } from "@/lib/studio/ToastContext";
import { apiErrorDetail } from "@/lib/api/authed-fetch";
import { cancelSubscription } from "@/lib/api/checkout";
import { getBilling } from "@/lib/api/billing";
import { getTeamBillingHistory } from "@/lib/api/teams";
import { formatDate, formatExpiry } from "@/lib/studio/date-format";
import { useNow } from "@/lib/studio/use-now";
import { titleCase } from "@/lib/tools/group-by-category";
import type { BillingPlan } from "@/lib/types/billing";
import type { BillingHistoryItem } from "@/lib/types/team";

const HISTORY_PAGE = 20;
const HISTORY_COLS = "grid-cols-[100px_minmax(0,1fr)_80px_90px_90px]";

const formatRupees = (paise: number) => `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export function BillingTab() {
  const { activeTeamId, activeTeam } = useTeam();
  const { billing, loading, refetch, openBuyModal } = useTeamBilling();
  const { say } = useToast();
  const now = useNow();
  const [cancelling, setCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [plans, setPlans] = useState<BillingPlan[]>([]);

  const [history, setHistory] = useState<BillingHistoryItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // The team's billing only carries the plan's slug; the plan catalog has
  // its name and what it includes (credits per period).
  useEffect(() => {
    getBilling().then((r) => setPlans(r.subscriptions));
  }, []);

  useEffect(() => {
    if (!activeTeamId) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reloading the first page when the team changes
    setHistoryLoading(true);
    setHistoryError(false);
    getTeamBillingHistory(activeTeamId, { limit: HISTORY_PAGE })
      .then((r) => {
        if (cancelled) return;
        setHistory(r.items);
        setNextCursor(r.nextCursor);
      })
      .catch(() => !cancelled && setHistoryError(true))
      .finally(() => !cancelled && setHistoryLoading(false));
    return () => {
      cancelled = true;
    };
  }, [activeTeamId]);

  async function loadMore() {
    if (!activeTeamId || !nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const r = await getTeamBillingHistory(activeTeamId, { limit: HISTORY_PAGE, cursor: nextCursor });
      setHistory((prev) => [...prev, ...r.items]);
      setNextCursor(r.nextCursor);
    } catch {
      say("Couldn't load more history");
    } finally {
      setLoadingMore(false);
    }
  }

  const subActive = billing?.subscriptionStatus?.toLowerCase() === "active";
  const planKey = billing?.plan?.toLowerCase();
  const currentPlan = planKey
    ? plans.find((p) => p.slug.toLowerCase() === planKey || p.name.toLowerCase() === planKey)
    : undefined;
  const planName = currentPlan?.name ?? (billing?.plan ? titleCase(billing.plan) : "");
  const planNameBySlug = (slug: string | null) =>
    slug ? (plans.find((p) => p.slug.toLowerCase() === slug.toLowerCase())?.name ?? titleCase(slug)) : "Plan";

  // Past its end date but still "active": the renewal payment hasn't landed yet.
  const periodEndMs = billing?.currentPeriodEnd ? new Date(billing.currentPeriodEnd).getTime() : null;
  const renewalProcessing = subActive && periodEndMs != null && periodEndMs < now;
  const periodEnd = formatDate(billing?.currentPeriodEnd);

  const pending = billing?.pendingSwitch;
  const pendingLive = !!pending?.plan && (!pending.expiresAt || new Date(pending.expiresAt).getTime() > now);

  const isOwner = activeTeam?.role === "owner";

  async function handleCancel() {
    if (!activeTeamId) return;
    setCancelling(true);
    try {
      await cancelSubscription(activeTeamId);
      say("Subscription canceled");
      setConfirmCancel(false);
      refetch();
    } catch (err) {
      say(apiErrorDetail(err, "Couldn't cancel the subscription"));
    } finally {
      setCancelling(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-dim">Loading billing…</p>;
  }

  if (!billing) {
    return <p className="text-sm text-dim">Couldn&apos;t load billing right now.</p>;
  }

  // Plan-switch transfers just move credits between pools — not a charge.
  const rows = history.filter((h) => h.type !== "switch_transfer");

  const describe = (h: BillingHistoryItem) =>
    h.type === "topup_purchase"
      ? "Top-up"
      : `${planNameBySlug(h.plan)}${h.period ? ` · per ${h.period}` : ""}`;

  return (
    <div className="flex flex-col gap-5">
      {!isOwner && (
        <p className="text-xs text-accent">
          You can view billing, but only the team owner can buy credits or manage the subscription.
        </p>
      )}

      <div className="border border-border p-5">
        <div className="font-mono text-[10.5px] tracking-wide text-muted">CURRENT PLAN</div>
        {billing.plan && subActive ? (
          <div className="mt-2.5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-heading text-[22px] font-bold">{planName}</span>
                <span className="rounded-full border border-accent px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-accent">
                  ACTIVE
                </span>
              </div>
              {currentPlan && (
                <div className="mt-1 text-[13px] text-muted">
                  {currentPlan.credits.toLocaleString()} credits/{currentPlan.periodLabel}
                </div>
              )}
              {(renewalProcessing || periodEnd) && (
                <div className="mt-0.5 text-[12.5px] text-muted">
                  {renewalProcessing ? "Renewal processing" : `Renews ${periodEnd}`}
                </div>
              )}
              {pendingLive && (
                <div className="mt-2 text-[12.5px] text-accent">
                  Upgrade to {planNameBySlug(pending?.plan ?? null)} · waiting for payment
                  {formatExpiry(pending?.expiresAt) ? ` · expires ${formatExpiry(pending?.expiresAt)}` : ""}
                </div>
              )}
            </div>
            {isOwner && (
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => openBuyModal("sub")}
                  className="whitespace-nowrap rounded-full border border-border-strong px-5 py-2.5 text-[13.5px] font-medium hover:border-accent"
                >
                  Manage subscription
                </button>
                <button
                  onClick={() => setConfirmCancel(true)}
                  className="text-[12px] text-dim underline-offset-2 hover:text-[#ff8a6b] hover:underline"
                >
                  Cancel subscription
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2.5 flex items-center justify-between">
            <div className="text-[15px] text-muted">No active subscription</div>
            {isOwner && (
              <button
                onClick={() => openBuyModal("sub")}
                className="whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-accent-ink hover:bg-accent-hover"
              >
                Choose a plan
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 border border-border p-5">
        <div>
          <div className="font-mono text-[10.5px] tracking-wide text-muted">CREDIT BALANCE</div>
          <div className="mt-1 flex items-center gap-2 font-heading text-[30px] font-bold">
            <CreditIcon size={26} />
            {billing.totalCredits} credits
          </div>
          <div className="mt-1.5 flex gap-4 text-[12.5px] text-muted">
            <span>
              Plan credits <span className="font-semibold text-text">{billing.subscriptionCredits}</span>
            </span>
            <span>
              Top-up credits <span className="font-semibold text-text">{billing.topupCredits}</span>
            </span>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={() => openBuyModal("credits")}
            className="whitespace-nowrap rounded-full border border-border-strong px-5 py-2.5 text-[13.5px] font-medium hover:border-accent"
          >
            Buy credits
          </button>
        )}
      </div>

      <div>
        <span className="font-mono text-[11px] tracking-widest text-muted">BILLING HISTORY</span>
        <div className="mt-3 overflow-hidden border border-border">
          <div
            className={`grid ${HISTORY_COLS} items-center gap-3 border-b border-border px-4 py-2.5 font-mono text-[10.5px] tracking-wide text-muted`}
          >
            <span>DATE</span>
            <span>DESCRIPTION</span>
            <span className="text-right">CREDITS</span>
            <span className="text-right">PAID</span>
            <span className="text-right">BALANCE</span>
          </div>

          {historyLoading ? (
            <p className="p-4 text-center text-[13px] text-dim">Loading…</p>
          ) : historyError ? (
            <p className="p-4 text-center text-[13px] text-dim">Couldn&apos;t load billing history right now.</p>
          ) : rows.length === 0 ? (
            <p className="p-4 text-center text-[13px] text-dim">No charges yet</p>
          ) : (
            rows.map((h) => (
              <div
                key={h.id}
                className={`grid ${HISTORY_COLS} items-center gap-3 border-b border-border px-4 py-3 text-[13px] last:border-b-0`}
              >
                <span className="text-muted">{formatDate(h.createdAt) ?? "—"}</span>
                <span className="truncate font-medium">{describe(h)}</span>
                <span className="text-right font-mono">
                  {h.credits > 0 ? "+" : ""}
                  {h.credits}
                </span>
                <span className="text-right text-muted">{h.amountPaid != null ? formatRupees(h.amountPaid) : "—"}</span>
                <span className="text-right font-mono text-muted">{h.balanceAfter ?? "—"}</span>
              </div>
            ))
          )}
        </div>

        {nextCursor && !historyLoading && (
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="mx-auto mt-3 flex items-center gap-2 rounded-full border border-border-strong px-6 py-2.5 text-[13px] font-medium hover:border-accent disabled:opacity-60"
          >
            {loadingMore && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-border-strong border-t-accent" />
            )}
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        )}
      </div>

      {confirmCancel && (
        <div
          onClick={() => !cancelling && setConfirmCancel(false)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-[400px] flex-col gap-3.5 border border-border-strong bg-bg p-7"
          >
            <div className="font-heading text-[17px] font-semibold">Cancel your subscription?</div>
            <p className="text-[13.5px] leading-relaxed text-muted">
              Your access ends immediately. Your remaining credits will remain available.
            </p>
            <div className="mt-1.5 flex gap-2.5">
              <button
                onClick={() => setConfirmCancel(false)}
                disabled={cancelling}
                className="flex-1 rounded-full border border-border-strong py-2.5 text-[13.5px] font-medium hover:border-accent"
              >
                Keep subscription
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 rounded-full border border-[#ff5c4d] py-2.5 text-[13.5px] text-[#ff8a6b] hover:bg-[#ff5c4d]/10 disabled:opacity-60"
              >
                {cancelling ? "Cancelling…" : "Cancel subscription"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
