//  when user send req from fronted -> by clicking button then request gos to backend at api/auth/signup first then from here we take request and store this data in datbase that name is User in database , tehn this after signup it geenrate a jwt token and then we send this in cookies to user back..so first step is this so do this in signup api;

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {upsertStreamUser } from "../lib/stream.js"
export  async function signup(req,res){
    try{
    const {fullName, email, password} = req.body;
    //  as we take above when user send us from fronted , so that come here 
     if(!email|| !fullName|| !password )
        return res.status(400). json({message: "all fiel should be there beta ..💁🏻"})
    if(password.length<4)
        return res.status(400).json({message: "password should be more than 4"})
    //  now email should be proper na measn should be @ gmail . com and all
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // if email already exist then it should send message that already exist dont sign up instead signin
    const existUser =  await User.findOne({email});
    if(existUser) return res.status(400).json({message: "aapki di hui mail exist krti hh kirpa kr duji mail payo ya jadhi exist krdi hh usko sign in kro"})
        //  now we want to show different avatir alos so for that visit link : https://avatar.iran.liara.run/public

const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser  = await User.create({
        email,
        fullName,
        password,
        profilePic:randomAvatar
    })
    /*
    When User.create() is called → Mongoose does this:
🔄 User.create() → before saving → it triggers pre("save") middleware automatically
So now your pre("save") block starts running…
    */
try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }
    //  now create a jwt token:


const token = jwt.sign({ userId: newUser._id},process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    })
    res.cookie("jwt",token,{
         maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    })
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}

 
export  async function login(req,res){
    //  now from fonted login button , we take emil and passowrd in backend
    try{ 
    const {email, password} = req.body;
    console.log(email,password)
    if(!email || !password) 
       return  res.status(400).json({message: " all field must be there bro..."})
    const user = await User.findOne({email})
   if (!user) return res.status(401).json({ message: "Invalid email or password" });
        // now comapre password 
const ispasswordcorrect = await user.matchPassword(password);
  if (!ispasswordcorrect) return res.status(401).json({ message: "Invalid email or password" });

   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token,{
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
     res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }


}

export function logout(req,res){
 res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout successful" });
}

export async function onboard(req,res){
  try{
    const userId = req.user._id; // as we have na req.user=user so from there we taking _id 
    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;
    //  as above we require na so we take it from fronted na where we define this in button
    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
return res.status(400).json({
   message: "All fields are required",
        missingFields:[
           !fullName && "fullName",
        !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean)
})
// .filter(Boolean) → removes all false values, leaving only missing fields.

    }
    //  so this page is designed so that if user want to do some updation that they can do but then this should also update user database where data is there
    const updateUser = await User.findByIdAndUpdate(userId,{
      ...req.body,
       isOnboarded: true, // it means 
    },{
      new:true
    });
    // By default, findByIdAndUpdate returns the old document (before the update).
// { new: true } → tells Mongoose to return the updated document after changes.

    if (!updateUser) return res.status(404).json({ message: "User not found" });
    try{
      await upsertStreamUser({
        id: updateUser._id.toString(),
        name: updateUser.fullName,
         image: updateUser.profilePic || "",
      })
      console.log(`Stream user updated after onboarding for ${updateUser.fullName}`);
    } catch (streamError) {
      console.log("Error updating Stream user during onboarding:", streamError.message);
    }
  }catch(error){
console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}