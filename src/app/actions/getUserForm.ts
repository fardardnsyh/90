"use server";

import { connectToDB } from "@/db/database";
import Form from "@/db/models/formDocument";
require("@/db/models/question");
require("@/db/models/fieldOption");

const getUserForm = async (formId: string) => {
  try {
    await connectToDB();
    const form = await Form.findById(formId)
      .populate({
        path: "questions",
        populate: {
          path: "fieldOptions",
        },
      })
      .lean();
    return JSON.parse(JSON.stringify(form));
  } catch (error) {
    console.error("Error getting form.", error);
  }
};

export default getUserForm;
