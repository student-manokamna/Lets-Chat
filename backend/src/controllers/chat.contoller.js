
import {generateStreamToken} from "../lib/stream.js"
export async function getstreamToken(req,res){
    try{
const token = generateStreamToken(req.user._id);
res.status(200).json({token});
    }
    catch(e){
        console.log("err occur here in chat.contoller.js is :", e.message),
       res.status(500).json({ message: "Internal server error in chat.controller.js" });

    }
}