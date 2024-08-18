import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for verification token
interface VerificationTokenDocument extends Document {
  identifier: string;
  token: string;
  expires: Date;
}

const VerificationTokenSchema = new Schema<VerificationTokenDocument>({
  identifier: { type: String, required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});

// Define compound key for the schema
VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

export default mongoose.models?.VerificationToken ||
  mongoose.model("VerificationToken", VerificationTokenSchema);
