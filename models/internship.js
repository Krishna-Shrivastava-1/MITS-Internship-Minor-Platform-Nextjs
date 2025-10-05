import mongoose from "mongoose";
const internshipSchema = new mongoose.Schema({
     student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
            require: true
        },
        department: {
            type: String
        },
        companyName: {
            type: String,
            required: true,
            trim: true
        },
        yearOfStudy: {
            type: String,
            enum: [1, 2, 3, 4],
            required: true
        },
        semester: {
            type: Number,
            enum: [1, 2, 3, 4, 5, 6, 7, 8],
            required: true
        },
        sessionHalf: {
            type: String,
            enum: ["Jan-Jun", "Jul-Dec"],
            required: true,
        },
        sessionYear: {
            type: Number, // e.g -> 2023
            required: true,
        },
    
        duration: {
            type: Number
        },
        
        location: {
            type: String,
            required: true
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        stipend: {
            type: Number,
            default: 0
        },
        offerLetter: {
            type: String,
            // required: true
        },
        completionCertificate: {
            type: String,
            // required: true
        },
        workType:{
            type:String,
            enum:['Remote','Hybrid','Onsite']
        },
        role:{
            type:String,
            required:true
        },
        jobDescription:{
            type:String,
        }
},{timestamps:true})

export const internshipModel = mongoose.models.internshipDetail || mongoose.model('internshipDetail',internshipSchema)