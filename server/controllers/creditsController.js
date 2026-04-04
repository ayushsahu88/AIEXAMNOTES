import Stripe from "stripe";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
  100: 50,
  200: 120,
  500: 300,
};

export const createCreditsOrder = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER ID:", req.userId);

    // ✅ amount ko number me convert karo
    const numericAmount = Number(req.body.amount);

    if (!numericAmount) {
      return res.status(400).json({ message: "Amount required" });
    }

    if (!CREDIT_MAP[numericAmount]) {
      return res.status(400).json({ message: "Invalid credit plan" });
    }

    // ✅ userId fix (auth ho ya na ho)
    const userId = req.userId || "temp_user";

    // ✅ Stripe session create
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[numericAmount]} Credits`,
            },
            unit_amount: numericAmount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        credits: CREDIT_MAP[numericAmount],
      },
    });

    console.log("Stripe session created");

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log("STRIPE ERROR:", error.message);
    return res.status(500).json({
      message: "Stripe error",
      error: error.message,
    });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log("Webhook Error:", error.message);
    return res.status(400).send("Webhook Error");
  }

  // ✅ Payment success handle
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const creditsToAdd = Number(session.metadata.credits);

    console.log("Payment Success:", userId, creditsToAdd);

    if (!userId || !creditsToAdd) {
      return res.status(400).json({ message: "Invalid metadata" });
    }

    try {
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $inc: { credits: creditsToAdd },
          $set: { isCreditAvailable: true },
        },
        { new: true },
      );

      console.log("Credits Updated ✅");
    } catch (err) {
      console.log("DB ERROR:", err.message);
    }
  }

  res.json({ received: true });
};
