import mongoose from 'mongoose';

const lecturerCoursesExamsSchema = new mongoose.Schema({
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Courses',
        required: true
    }, 
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    }
}, { timestamps: true });

export const LecturerCoursesExams = mongoose.model('LecturerCoursesExams', lecturerCoursesExamsSchema);
