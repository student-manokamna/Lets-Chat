import express from "express";
import { protectroute } from "../middleware/auth.middleware.js";
import { getAIResponse } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/chat", protectroute, getAIResponse);

export default router;
