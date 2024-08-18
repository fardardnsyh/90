import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for field options
interface FieldOptionDocument extends Document {
  text?: string;
  value?: string;
  questionId?: string;
}

const FieldOptionSchema = new Schema<FieldOptionDocument>({
  text: String,
  value: String,
  questionId: String,
});

// Define relations between FieldOption and Question
FieldOptionSchema.virtual("question", {
  ref: "Question",
  localField: "questionId",
  foreignField: "_id",
});

// Populate the virtual field when querying fieldOptions
// Include in response but they are not stored in db
FieldOptionSchema.set("toObject", { virtuals: true });
FieldOptionSchema.set("toJSON", { virtuals: true });

export default mongoose.models?.FieldOption ||
  mongoose.model("FieldOption", FieldOptionSchema);
