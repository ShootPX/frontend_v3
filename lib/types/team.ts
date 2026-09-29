// Teams have exactly two roles. A team can have several owners; the last
// owner can't be removed.
export type TeamRole = "owner" | "editor";
export type InviteRole = TeamRole;

export type MyTeam = {
  id: string;
  name: string;
  role: TeamRole;
};

export type MyTeamsResponse = {
  teams: MyTeam[];
};

export type TeamInvite = {
  id: string;
  email: string;
  role: InviteRole;
  createdAt: string;
};

export type TeamInvitesResponse = {
  invites: TeamInvite[];
};

export type TeamMember = {
  userId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: TeamRole;
  joinedAt: string;
};

export type TeamMembersResponse = {
  id: string;
  name: string;
  members: TeamMember[];
};

export type TeamBilling = {
  totalCredits: number;
  subscriptionCredits: number;
  topupCredits: number;
  plan: string | null;
  subscriptionStatus: string | null;
  currentPeriodEnd: string | null;
  /** An upgrade waiting on payment; `plan` is the target plan's slug. The current plan stays live meanwhile. */
  pendingSwitch?: { plan: string | null; expiresAt: string | null } | null;
};

export type BillingHistoryItem = {
  id: string;
  type: "subscription_grant" | "switch_transfer" | "topup_purchase" | (string & {});
  pool: "subscription" | "topup" | (string & {});
  credits: number;
  balanceAfter: number | null;
  plan: string | null; // plan slug, for subscription entries
  period: string | null; // week | month | year
  cycle: number | null;
  amountPaid: number | null; // paise; null for free slices and transfers
  reference: string | null;
  createdAt: string | null;
};

export type BillingHistoryResponse = {
  items: BillingHistoryItem[];
  nextCursor: string | null;
};

export type TeamUsagePeriod = "week" | "month";

export type TeamUsageByMember = {
  userId: string;
  name: string;
  credits: number;
};

export type TeamUsageByTool = {
  featureType: string;
  displayName: string;
  credits: number;
};

export type TeamUsage = {
  creditsUsed: number;
  byMember: TeamUsageByMember[];
  byTool: TeamUsageByTool[];
};
