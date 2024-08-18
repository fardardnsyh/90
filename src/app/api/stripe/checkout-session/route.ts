"use server";
import { connectToDB } from "@/db/database";
import User from "@/db/models/user";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request, response: Response) {
  const { price, userId, quantity = 1 } = await request.json();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  try {
    await connectToDB();
    const user = await User.findById(userId);

    let customer;

    if (user?.stripeCustomerId) {
      customer = { id: user.stripeCustomerId };
    } else {
      const customerData: { metadata: { dbId: string } } = {
        metadata: { dbId: userId },
      };
      const response = await stripe.customers.create(customerData);
      customer = { id: response.id };

      const filter = { _id: userId };
      const update = { stripeCustomerId: customer.id, subscribed: true };
      await User.findOneAndUpdate(filter, update);
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `${baseUrl}/payment/success`,
        customer: customer.id,
        payment_method_types: ["card"],
        line_items: [{ price, quantity }],
        mode: "subscription",
      });
      if (session) {
        return new Response(JSON.stringify({ sessionId: session.id }), {
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Failed to create session." }),
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error creating checkout session.", error);
    }
  } catch (error) {
    console.error("Cannot find user.", error);
  }
}
