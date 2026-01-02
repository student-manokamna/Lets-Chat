import express, { Router } from "express"
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
const router =Router();
import { protectroute } from "../middleware/auth.middleware.js";


router.post("/signup", signup )

router.post("/login", login);
router.post("/logout", logout);
router.post("/onboarding", protectroute, onboard)
//  protectroute means once user login aab uske pas token hh cokiie m toh vo phle check kro vo cokkie hh na exiwt krti hh asame hh and then we proced to do function further , so if token validate then procedd further 

// check if user is logged in

router.get("/me",protectroute, (req,res)=>{
  res.status(200).json({ success: true, user: req.user });
})

export default router;
