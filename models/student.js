import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    enrollmentNumber:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    nocRequests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'nocRequests'
    }],
    internshipDetails:[{
       type:mongoose.Schema.Types.ObjectId,
        ref:'internshipDetail'
    }],
    department:{
        type:String
    },
    role:{
        type:String,
        enum:['student','teacher','superadmin'],
        default:'student'
    },
     googleId: { type: String, default: null },
  profilePic: String,
},{timestamps:true})

export const studentModel = mongoose.models.student || mongoose.model('student',studentSchema)