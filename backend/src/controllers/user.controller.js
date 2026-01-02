import User from "../models/User.js";
// ✅ IMPORT FIX: We use "FriendRequest" (Capital F) for the Model (The Factory).
// This prevents confusion with "friendRequest" (lowercase) which is a specific document variable later.
import FriendRequest from "../models/friendRequest.js"; 

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;
    
    // Logic: Find users who are NOT me ($ne), and NOT already my friends ($nin), and ARE onboarded.
    const recommendUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude myself
        { _id: { $nin: currentUser.friends } }, // Exclude my existing friends
        { isOnboarded: true }, // Only show users who completed signup
      ],
    });
    
    res.status(200).json(recommendUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    // Logic: Get my user data, but only the 'friends' list.
    // .populate() is magic: It swaps the Friend ID for their actual Name/Picture/Languages from the User database.
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
      
    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    // 1. Safety Check: You can't be friends with yourself
    if (myId.toString() === recipientId)
      return res.status(400).json({ message: "You cannot send a request to yourself" });

    // 2. Safety Check: Does the person exist?
    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    // 3. Safety Check: Are you already friends?
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // 4. Safety Check: Is there already a pending request?
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "A friend request already exists" });
    }

    // ✅ CREATE FIX: We create the new request using the Capitalized Model "FriendRequest"
    const newRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    // Return the actual newRequest data, not the Model itself
    res.status(201).json(newRequest); 

  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    // ✅ VARIABLE NAME FIX: We use 'requestToAccept' so we don't mix it up with the Model 'FriendRequest'.
    const requestToAccept = await FriendRequest.findById(requestId);

    if (!requestToAccept) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Security: Only the person receiving the request can accept it.
    if (requestToAccept.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    // ✅ LOGIC FIX: Update the specific document we found.
    requestToAccept.status = "accepted";
    await requestToAccept.save(); // This saves the specific request as 'accepted'

    // 1. Add ME to THEIR friends list
    await User.findByIdAndUpdate(requestToAccept.sender, {
      $addToSet: { friends: requestToAccept.recipient },
    });

    // 2. Add THEM to MY friends list
    await User.findByIdAndUpdate(requestToAccept.recipient, {
      $addToSet: { friends: requestToAccept.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    // Get requests where I am the Recipient (Incoming) and status is Pending
    const incomingReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    // Get requests that I accepted (History)
    const acceptreqs = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptreqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    // Get requests where I am the Sender (I sent them) and status is Pending
    const outgoingReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");
    
    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
    
    // When we fetch friend requests, it depends on whether you are the sender or the recipient. For incoming requests, you are the recipient (req.user.id), so we use .populate("sender") to get the sender’s information like name, profile picture, and languages. This is because you want to see who sent the request to you. On the other hand, for accepted requests that you sent, you are the sender, so we use .populate("recipient") to get the recipient’s information. This is because you want to see who accepted your friend request. In short, for incoming requests, we show the sender’s info, and for requests you sent that are accepted, we show the recipient’s info.
  