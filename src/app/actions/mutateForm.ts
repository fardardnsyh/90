"use server";
import { connectToDB } from "@/db/database";
import Form from "@/db/models/formDocument";

export async function publishForm(formId: { $oid: string }) {
  console.log(formId);
  try {
    await connectToDB();
    await Form.findByIdAndUpdate(formId, { published: true });
    console.log("Form published successfully.");
  } catch (error) {
    console.error("Error publishing form.", error);
  }
}
