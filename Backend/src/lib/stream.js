import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.Chat_API_KEY;
const apiSecret = process.env.Chat_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
    try {
        const userIdstr=userId.toString();
        return streamClient.createToken(userIdstr); // ✅ only return token

    } catch (error) {
        console.error("Error generating Stream token:", error);
        throw new Error("Failed to generate Stream token");
    }
}
    