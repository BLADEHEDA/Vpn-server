import mongoose from 'mongoose';

const signupSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'lecturer', 'staff'], 
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,       
        ref: 'LecturerCourse'
    }]
    
});

export const Signup = mongoose.model('Signup', signupSchema);

