import { connectToDB } from "@/db/database";
import FormSubmission from "@/db/models/formSubmission";
import Answer from "@/db/models/answer";

export async function POST(request: Request): Promise<Response> {
  const data = await request.json();
  try {
    await connectToDB();
    const newFormSubmission = await FormSubmission.create({
      formId: data.formId,
    });

    const insertedId = newFormSubmission._id;
    for (const answer of data.answers) {
      await Answer.create({
        formSubmissionId: insertedId,
        ...answer,
      });
    }
    return Response.json({ formSubmissionsId: insertedId }, { status: 200 });
  } catch (error) {
    console.error("Error saving answers.", error);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
