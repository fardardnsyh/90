import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for Form
interface FormDocument extends Document {
  name?: string;
  description?: string;
  userId?: string;
  published?: boolean;
  createdAt?: Date;
}

const FormSchema = new Schema<FormDocument>({
  name: String,
  description: String,
  userId: String,
  published: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define relations for form
FormSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "formId",
});

FormSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

FormSchema.virtual("submissions", {
  ref: "FormSubmission",
  localField: "_id",
  foreignField: "formId",
});

// Populate the virtual fields when querying forms
// include them in response but they are not stored in db
FormSchema.set("toObject", { virtuals: true });
FormSchema.set("toJSON", { virtuals: true });

export default mongoose.models?.Form || mongoose.model("Form", FormSchema);
