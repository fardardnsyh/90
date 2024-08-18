import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for answers
interface AnswerDocument extends Document {
  value?: string;
  questionId?: string;
  formSubmissionId?: string;
  fieldOptionsId?: string;
}

const AnswerSchema = new Schema<AnswerDocument>({
  value: String,
  questionId: String,
  formSubmissionId: String,
  fieldOptionsId: String,
});

// Define answers relations with other entities
AnswerSchema.virtual("question", {
  ref: "Question",
  localField: "questionId",
  foreignField: "_id",
});

AnswerSchema.virtual("formSubmission", {
  ref: "FormSubmission",
  localField: "FormSubmissionId",
  foreignField: "_id",
});

AnswerSchema.virtual("fieldOption", {
  ref: "FieldOption",
  localField: "fieldOptionsId",
  foreignField: "_id",
});

// Populate the virtual fields when querying answers
// Include in response but they are not stored in db
AnswerSchema.set("toObject", { virtuals: true });
AnswerSchema.set("toJSON", { virtuals: true });

export default mongoose.models?.Answer ||
  mongoose.model("Answer", AnswerSchema);
