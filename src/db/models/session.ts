import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for sessions
interface SessionDocument extends Document {
  sessionToken: string;
  userId: string;
  expires: Date;
}

const SessionSchema = new Schema<SessionDocument>({
  sessionToken: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  expires: { type: Date, required: true },
});

export default mongoose.models?.Session ||
  mongoose.model("Session", SessionSchema);
