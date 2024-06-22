import mongoose from 'mongoose';

const studentCoursesExamsSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
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
    },
    caMark: {
        type: Number,
        required: true,
        min: 0,
        max: 30
    },
    examMark: {
        type: Number,
        required: true,
        min: 0,
        max: 70
    }
}, { timestamps: true });

export const StudentCoursesExams = mongoose.model('StudentCoursesExams', studentCoursesExamsSchema);
