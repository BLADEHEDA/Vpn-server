import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    semester: {
        type: String,
        enum: ['first_semester', 'second_semester', 'resit_semester'],
        required: true
    },
},
 { timestamps: true } 
)

export const Exam = mongoose.model('Exam',examSchema)
