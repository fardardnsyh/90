"use server";
import { connectToDB } from "@/db/database";
import User from "@/db/models/user";

export async function createSubscription(stripeCustomerId: string) {
  try {
    await connectToDB();
    await User.updateOne(
      { stripeCustomerId: stripeCustomerId },
      { subscribed: true }
    );
    console.log("Subscription created successfully.");
  } catch (error) {
    console.error("Error creating subscription.", error);
  }
}

export async function deleteSubscription(stripeCustomerId: string) {
  try {
    await connectToDB();
    await User.updateOne(
      { stripeCustomerId: stripeCustomerId },
      { subscribed: false }
    );
    console.log("Subscription deleted successfully");
  } catch (error) {
    console.error("Error deleting subscription.", error);
  }
}

export async function getUserSubscription(userId: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ _id: userId });
    return user ? user.subscribed : null;
  } catch (error) {
    console.error("Error getting subscription status.", error);
  }
}
