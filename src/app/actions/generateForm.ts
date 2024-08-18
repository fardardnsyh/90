"use server";

import { connectToDB } from "@/db/database";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import Form from "@/db/models/formDocument";
import Question from "@/db/models/question";
import FieldOption from "@/db/models/fieldOption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const generateForm = async (
  prevState: { message: string; data?: any },
  formData: FormData
): Promise<{ message: string; data?: any } | undefined> => {
  const schema = z.object({ description: z.string().min(1) });
  const parse = schema.safeParse({
    description: formData.get("description"),
  });

  if (!parse.success) {
    console.error(parse.error);
    return { message: "Failed to parse data." };
  }

  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?.id;

  if (!process.env.OPEN_ROUTER_API_KEY) {
    return {
      message: "NO OpenAI API key found.",
    };
  }

  const data = parse.data;
  let completion;
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  try {
    const response = await fetch(url + "/api/form/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    if (response.status === 200) {
      completion = await response.json();
    }
  } catch (error) {
    console.error("Error sending openai request: ", error);
  }
  //@ts-ignore
  const content = completion?.content.choices[0].message.content;
  const jsonStartIndex = content?.indexOf("{");
  const jsonEndIndex = content?.lastIndexOf("}");
  const jsonString = content?.substring(jsonStartIndex!, jsonEndIndex! + 1);
  const surveyObject = JSON.parse(jsonString!);

  try {
    const newForm = new Form({
      name: surveyObject.name,
      description: surveyObject.description,
      userId: userId,
    });

    await connectToDB();
    await newForm.save();

    for (const questionData of surveyObject.questions) {
      const question = new Question({
        text: questionData.text,
        fieldType: questionData.fieldType,
        formId: newForm._id,
      });
      await question.save();

      for (const fieldOptionData of questionData.fieldOptions) {
        await FieldOption.create({
          text: fieldOptionData.text,
          value: fieldOptionData.value,
          questionId: question._id,
        });
      }
    }

    const newFormObj = newForm.toObject();
    const formId = newFormObj._id.toString();
    revalidatePath("/");

    return {
      message: "success",
      data: { formId: formId },
    };
  } catch (error) {
    console.error("Error saving new Form: ", error);
    return {
      message: "error",
    };
  }
};
