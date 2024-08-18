"use server";
import User from "@/db/models/user";
import { stripe } from "@/lib/stripe";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  //@ts-ignore
  const userId = session?.user?.id;
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found." }), {
      status: 404,
    });
  }
  let customer;
  if (user?.stripeCustomerId) {
    customer = {
      id: user.stripeCustomerId,
    };
  } else {
    const customerData: {
      metadata: {
        dbId: string;
      };
    } = {
      metadata: {
        dbId: userId,
      },
    };
    const response = await stripe.customers.create(customerData);

    customer = { id: response.id };
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${baseUrl}/settings`,
  });

  return new Response(JSON.stringify({ url }), {
    status: 200,
  });
}
