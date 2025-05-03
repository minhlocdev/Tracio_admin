export type Subscription = {
  subscriptionPlanId: number;
  name: string;
  price: number; //VND
  duration: number; //DAYS
  isActive: boolean;
  createdAt: string;
};
