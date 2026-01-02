import express, { Router } from "express"
import { protectroute } from "../middleware/auth.middleware.js";

import {getstreamToken} from "../controllers/chat.contoller.js"

const router = Router();
router.get("/token",protectroute, getstreamToken);

export default router;
