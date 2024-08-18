import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  // values added to model that are not specified
  // in the schema will not be saved
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "form-builder",
    });
    isConnected = true;
    console.log("MongoDB connected.");
  } catch (error) {
    console.log(error);
  }
};
