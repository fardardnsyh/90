import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for  form submissions
interface FormSubmissionDocument extends Document {
  formId?: string;
}

const FormSubmissionSchema = new Schema<FormSubmissionDocument>({
  formId: String,
});

// Define form submissions relations
FormSubmissionSchema.virtual("form", {
  ref: "Form",
  localField: "formId",
  foreignField: "_id",
});

FormSubmissionSchema.virtual("answers", {
  ref: "Answer",
  localField: "_id",
  foreignField: "formSubmissionId",
});
// Populate the virtual field when querying formSubmissions
// Include in response but they are not stored in db
FormSubmissionSchema.set("toObject", { virtuals: true });
FormSubmissionSchema.set("toJSON", { virtuals: true });

export default mongoose.models?.FormSubmission ||
  mongoose.model("FormSubmission", FormSubmissionSchema);
