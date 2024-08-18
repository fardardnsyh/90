"use server";
import { connectToDB } from "@/db/database";
import Form from "@/db/models/formDocument";

export async function getUserForms(userId: string) {
  if (!userId) {
    return [];
  }
  try {
    await connectToDB();
    console.log(userId);
    const forms = await Form.find({ userId: userId });
    return JSON.parse(JSON.stringify(forms));
  } catch (error) {
    console.error("Error getting user forms.", error);
    return JSON.parse(JSON.stringify([]));
  }
}
