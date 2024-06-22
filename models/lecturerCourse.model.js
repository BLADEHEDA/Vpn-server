import mongoose from "mongoose";

const lecturerCourseSchema = new mongoose.Schema({
    lecturerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
        required: true
    },
    courseId: {       
        type: mongoose.Schema.Types.ObjectId,     
        ref: 'Courses',
        required: true
    }
});

export const LecturerCourse = mongoose.model('LecturerCourse', lecturerCourseSchema);