import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({  
    courseName: {
        type: String,
        required: true   
    },
    courseCode: {
        type: String,
        required: true,
        unique: true
    },
    creditValue: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    }, 
    has_prerequisite: {
        type: Boolean,
        required: true  
    },  
    enrollments: [{
        type: mongoose.Schema.Types.ObjectId,       
        ref: 'Enrollment'
    }],
    lecturers: [{
        type: mongoose.Schema.Types.ObjectId,      
        ref: 'LecturerCourse'
    }],
})

export const Courses = mongoose.model('Courses',courseSchema);  

