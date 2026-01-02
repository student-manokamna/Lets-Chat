import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;     // ✅ Fixed typo (was STEAM)
const apiSecret = process.env.STREAM_API_SECRET; // ✅ Fixed typo

if (!apiKey || !apiSecret) {
  throw new Error("Stream API key or Secret is missing in .env");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    // Upsert expects an object or array of objects
    await streamClient.upsertUser(userData);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error; // Rethrow so the controller knows it failed
  }
};

export const generateStreamToken = (userId) => {
  // This is synchronous (no 'async'), so it returns a String immediately.
  // This prevents the "token must be a string" error.
  return streamClient.createToken(userId.toString());
};