import mongoose from "mongoose";
import { type } from "os";

const messageShchema=new mongoose.Schema({
   senderID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   recieverID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   message:{
    type:String,
   },
   Image:{
    type: String,
   }},
   {timestamps: true}
);

const Message= mongoose.model("Message",messageShchema);

export default Message;

