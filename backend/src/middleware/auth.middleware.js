import jwt from "jsonwebtoken"
import User from "../models/User.js"


export async function protectroute(req,res,next){
    try{
    const token =  req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //  as whenw e creating token then we use jwt secret key na so here also we use this  when we decoding it 
if (!decode) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    //  if verified then extract the info by taking userid from decode , as when we encoding this then we use user id for that so for now decoding we want to extract that same user id so by extracting that user id we findinf user all info but here we do not want info abou password so we hide that

    const user = await User.findById(decode.userId).select("-password");
     if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    req.user = user;
    //  so all info we get this in req 
    next();
}
catch (error) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}
