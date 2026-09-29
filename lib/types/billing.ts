export type BillingPlan = {
  id: string;
  slug: string;
  name: string;
  price: number;
  billingPeriodDays?: number;
  periodLabel?: string;
  credits: number;
  info: string[];
  tag: string;
  /** Subscriptions only; credit packs don't carry it. */
  isPopular?: boolean;
  sortOrder: number;
};

export type BillingResponse = {
  subscriptions: BillingPlan[];
  credits: BillingPlan[];
};
