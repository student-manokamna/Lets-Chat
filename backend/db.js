import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected (Docker)");
  } catch (err) {
    console.error(err);
  }
}

export default connectDB;


