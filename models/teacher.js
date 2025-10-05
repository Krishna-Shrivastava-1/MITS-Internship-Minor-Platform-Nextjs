import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
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
  
    department:{
        type:String
    },
     assignedDepartmentForNocRequest:{
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

export const teacherModel = mongoose.models.teacher || mongoose.model('teacher',teacherSchema)