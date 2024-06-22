import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    matricule: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true

    },
    image: {
        type: String,
        required: false,   
        unique: true     
    },  
    enrollments: [{
        type: mongoose.Schema.Types.ObjectId,     
        ref: 'Enrollment'
    }],
}, { timestamps: true });

export const Student = mongoose.model('student', studentSchema);

