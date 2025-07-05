import express from 'express';
import { protectRoute} from "../middleware/auth.middleware.js";
import { getUsersforSideBar, getMessages } from '../controllers/message.controller.js';

const router =express.Router();

router.get('/users',protectRoute, getUsersforSideBar);
router.get('/:id', protectRoute, getMessages);

export default router;