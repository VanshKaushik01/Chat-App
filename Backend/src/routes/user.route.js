import express from 'express';
import { getRecommendedUsers, getmyFriends ,sendFriendRequest, acceptFriendRequests,getFriendRequests,getOutgoingFriendRequests } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.use(protectRoute);

router.get('/',getRecommendedUsers);
router.get('/friend',getmyFriends);

router.post('/friend-request/:id',sendFriendRequest);
router.put('/friend-request/:id/accept', acceptFriendRequests);  

router.get('/friend-requests',getFriendRequests);
router.get('/outgoing-friend-requests',getOutgoingFriendRequests);

export default router;