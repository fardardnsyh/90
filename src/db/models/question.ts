import mongoose, { Schema, Document } from "mongoose";

// Mongoose Schema for questions
interface QuestionDocument extends Document {
  text?: string;
  fieldType?: string;
  formId?: string;
}
const QuestionSchema = new Schema<QuestionDocument>({
  text: String,
  fieldType: String,
  formId: String,
});

// Define relations for questions
QuestionSchema.virtual("form", {
  ref: "Form",
  localField: "formId",
  foreignField: "_id",
});

QuestionSchema.virtual("fieldOptions", {
  ref: "FieldOption",
  localField: "_id",
  foreignField: "questionId",
});

QuestionSchema.virtual("answers", {
  ref: "Answer",
  localField: "_id",
  foreignField: "questionId",
});

// Populate the virtual fields when querying questions
// Include them in response but they are not stored in db
QuestionSchema.set("toObject", { virtuals: true });
QuestionSchema.set("toJSON", { virtuals: true });

export default mongoose.models?.Question ||
  mongoose.model("Question", QuestionSchema);
