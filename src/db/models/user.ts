import mongoose, { Schema, Document } from "mongoose";

// Mongoose schema for users
interface User extends Document {
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  stripeCustomerId?: string;
  subscribed?: boolean;
}

const UserSchema = new Schema<User>({
  name: String,
  email: { type: String, required: true },
  emailVerified: Date,
  image: String,
  stripeCustomerId: String,
  subscribed: Boolean,
});
export default mongoose.models?.User || mongoose.model("User", UserSchema);
