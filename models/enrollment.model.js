import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true 
    } ,
    academicYear: {
        type: String,
        required: true
    },
    attendanceCount: {   
        type: Number,
        required: true,
        default: 0  
    }
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);