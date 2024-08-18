"use server";

import { connectToDB } from "@/db/database";
import User from "@/db/models/user";

const getUser = async (userId: string) => {
  try {
    await connectToDB();
    const user = await User.findById(userId);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting user.", error);
  }
};

export default getUser;
