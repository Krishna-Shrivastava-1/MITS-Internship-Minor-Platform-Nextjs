import mongoose from "mongoose";
const announcementSchema = new mongoose.Schema({
  content:{
    type:String,
    trim:true,
    required:true
  },
  embeddedLink:{
    type:String,
      trim: true,
  },
  description:{
    type:String,
      trim: true,
  },
  active:{
    type:Boolean,
    default:false
  },
   expiresAt: {
    type: Date,
    required: true,
  },
},{timestamps:true})

export const announcementModel = mongoose.models.announcement || mongoose.model('announcement',announcementSchema)