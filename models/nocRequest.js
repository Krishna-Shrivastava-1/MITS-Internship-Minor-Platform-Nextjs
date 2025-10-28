import mongoose from "mongoose";
const nocSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        require: true
    },
    department: {
        type: String
    },
    enrollmentNumber: {
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
    teacherAction: {
        type: String,
        enum: ['Approve', 'Reject', 'Allow Edit', 'Pending'],
        default: 'Pending'
    },
    tAndPAction: {
        type: String,
        enum: ['Approve', 'Reject','Pending','Restricted'],
        default: 'Pending'
    },
    comment: {
        type: String
    },
    recieverName: {
        type: String
    },
    duration: {
        type: Number
    },
    recieverDesignation: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        default: 'None'
    },
    endDate: {
        type: String,
        default: 'None'
    },
    stipend: {
        type: Number,
        default: 0
    },
    offerLetter: {
        type: String,
        // required: true
    },
    workType: {
        type: String,
        enum: ['Remote', 'Hybrid', 'Onsite']
    },
    role: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String
    }
}, { timestamps: true })

export const nocModel = mongoose.models.nocRequests || mongoose.model('nocRequests', nocSchema)