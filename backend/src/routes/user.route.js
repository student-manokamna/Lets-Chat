import express from "express"
import { protectroute } from "../middleware/auth.middleware.js"
import {getRecommendedUsers,getMyFriends,sendFriendRequest, acceptFriendRequest,getFriendRequests, getOutgoingFriendReqs} from "../controllers/user.controller.js"
const router = express.Router();
// apply auth middleware to all routes
router.use(protectroute);

router.get("/", getRecommendedUsers); // recomned krega na kisko add krna h
router.get("/friends", getMyFriends); // kon kon se mere friend section m hh
//  now we will send request t friends
router.post("/friend-request/:id", sendFriendRequest); // for this first see this schema in model.js
//  now accept that request , and it is houls be put na bcz here we updating 
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
 