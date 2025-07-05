import User from "../models/user.js";
import Message from "../models/message.model.js";

export const getUsersforSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;    // Assuming req.user is populated by the protectRoute middleware
        const filteredUsers=await User.find({_id: { $ne: loggedInUserId}}).select("-password");
        return res.status(200).json(filteredUsers);
    } catch (error) {
        
        console.error("Error fetching users for sidebar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId}=req.params; // Extracting user ID from request parameters
        const myId = req.user._id; // Assuming req.user is populated by the protectRoute middleware
        
        const messages=await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ message: "Internal server error" }); 
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body; // Extracting content and receiver from request body
        const {id:receiverId} = req.params; // Assuming req.user is populated by the protectRoute middlewar
        const senderId = req.user._id; // Assuming req.user is populated by the protectRoute middleware
        const imageUrl = null; // Initialize imageUrl to null

        if (image) {
            const uploadResult = await cloudinary.uploader.upload(image);
            imageUrl = uploadResult.secure_url; // Get the secure URL of the uploaded image
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl // Store the image URL if an image was uploaded
        });
        await newMessage.save(); // Saving the new message to the database
        return res.status(201).json(newMessage); // Responding with the created message
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Internal server error" });
        }
    }