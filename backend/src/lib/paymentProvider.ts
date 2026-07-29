/**
 * Payment provider abstraction.
 *
 * The rest of the app only talks to `paymentProvider`, never to a specific
 * gateway. Today this resolves to the simulated provider, which auto-succeeds
 * in development so the registration flow can be built and tested end to end
 * without a real payment gateway.
 *
 * To go live with Razorpay (or any other gateway):
 *   1. Implement `PaymentProvider` in `razorpayProvider.ts`
 *      (createOrder -> Razorpay order, verifyPayment -> signature check).
 *   2. Swap the export below to that implementation.
 *   3. Nothing in controllers/routes needs to change.
 */

export interface CreateOrderResult {
  providerRefId: string;
  amount: number;
  currency: string;
  /** Extra data the frontend needs to render the checkout (checkout URL, key id, etc). */
  meta: Record<string, unknown>;
}

export interface PaymentProvider {
  name: "SIMULATED" | "RAZORPAY";
  createOrder(params: { amount: number; registrationId: string }): Promise<CreateOrderResult>;
  verifyPayment(params: { providerRefId: string; payload: Record<string, unknown> }): Promise<boolean>;
}

const simulatedProvider: PaymentProvider = {
  name: "SIMULATED",

  async createOrder({ amount, registrationId }) {
    return {
      providerRefId: `sim_${registrationId}_${Date.now()}`,
      amount,
      currency: "INR",
      meta: { mode: "simulated" },
    };
  },

  async verifyPayment() {
    // Development mode: every simulated payment succeeds.
    return true;
  },
};

export const paymentProvider: PaymentProvider = simulatedProvider;
