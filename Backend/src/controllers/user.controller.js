import User from '../models/user.js';
import FriendRequest from '../models/Friendsrequest.js';

export async function getRecommendedUsers(req,res){
    try {
        const currentuserId = req.user._id;
        const currentuser=req.user;
        const recommendedUsers= await User.find({
            $and: [
                { _id: { $ne: currentuserId } }, // Exclude current user
               {$id: {$nin : currentuser.friends}},
                { isOnboarded: true } // Only include onboarded users
            ]
        });
        res.status(200).json({recommendedUsers});
    } catch (error) {
        console.error("Error fetching recommended users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getmyFriends(req, res) {
    try {
        const user=User.findById(req.user.id).select('friends').
        populate('friends', 'fullname profilePicture nativeLanguage learningLanguage');

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function sendFriendRequest(req,res){
    try{
        const myId = req.user.id;
        const {id: recipientId } = req.params;

        if(myId === recipientId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }
        const recipient = await User.findById(recipientId);
        if(!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        // Check if the recipient is already a friend
      if(recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }
        // Check if a friend request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [

                { sender: myId , recipient: recipientId },
                { recipient: recipientId , sender: myId }
            ]   
        });
        if(existingRequest) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        response.status(201).json({FriendRequest});

    }catch (error) {
    
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function acceptFriendRequests(req, res) {
    try{
        const {id: requestId} = req.params;
        const friendRequest = await FriendRequest.findById(requestId);
        if(!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if(friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request" });
        }

        friendRequest.status = 'accepted';
        await friendRequest.save();

        await User.findByIdAndUpdate(
            friendRequest.sender,
            { $addToSet: { friends: friendRequest.recipient } }, // Add current user to sender's friends
            { new: true }      
        );
        await User.findByIdAndUpdate(
            friendRequest.recipient,
            { $addToSet: { friends: friendRequest.sender } }, // Add sender to current user's friends
            { new: true }
        );

    }catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function getFriendRequests(req, res) {
   try {
        const incomingRequests = await FriendRequest.find({
            recipient: req.user.id,
            status: 'pending'
        }).populate('sender', 'fullname profilePicture nativeLanguage learningLanguage');

        const acceptedRequests = await FriendRequest.find({
            sender: req.user.id,
            status: 'accepted'
        }).populate('recipient','fullname profilepicture');
        res.status(200).json({
            incomingRequests,
            acceptedRequests
        });
   } catch (error) {
        console.error("Error fetching friend requests:", error);
        res.status(500).json({ message: "Internal server error" });
    
   }
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const getOutgoingFriendRequests = await FriendRequest.find({
            sender: req.user.id,
            status: 'pending'
        }).populate('recipient', 'fullname profilePicture nativeLanguage learningLanguage');
        
        res.status(200).json(getOutgoingFriendRequests);
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }}