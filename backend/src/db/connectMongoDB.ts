
import mongoose from "mongoose";

export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) throw new Error("MONGO_URL not defined in .env");

    await mongoose.connect(mongoUrl);
    console.log("✅ MongoDB connection established successfully");
  } catch (error: any) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};