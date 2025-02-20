import "dotenv/config";

import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_API_KEY);

export const getAllCharges = async () =>
  stripe.charges.list({
    limit: 3,
  });

export const constructEvent = (body, signature) => {
  try {
    return stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_HOOK_KEY
    );
  } catch (error) {
    return {
      error: `Webhook signature verification failed: ${error.message}`,
    };
  }
};

export const createPayment = async (req) => {
  const {
    amount_donated,
    user_id: student_id,
    student_name,
    success_url,
    cancel_url,
  } = req.body;

  try {
    const price = await stripe.prices.create({
      unit_amount: amount_donated,
      currency: "usd",
      product_data: {
        // This is essential, even without a separate Product
        name: `Donation made to ${student_name}`, // Or a more descriptive name if needed
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      submit_type: "donate",
      payment_intent_data: {
        // Important for donations: Capture payment later
        capture_method: "automatic", // or 'automatic' if you want to capture immediately
      },
      success_url: `${success_url}?s_id={CHECKOUT_SESSION_ID}&amnt_dntd=${amount_donated}`, // Customize URLs
      cancel_url,
      metadata: {
        // Store donation-specific info
        student_id, // Add student ID or any other relevant data
      },
    });

    return session;
  } catch (error) {
    return { error: error.message };
  }
};

export default stripe;
