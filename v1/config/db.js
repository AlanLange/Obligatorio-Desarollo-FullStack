import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_URI_DEV   // ⬅️ nombres EXACTOS
        : process.env.MONGO_URI;

    if (!uri) {
      throw new Error("Mongo URI no definida. Revisa .env y los nombres.");
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
