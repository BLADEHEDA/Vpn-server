import {Signup} from '../models/signUp.model.js';
import bcrypt from 'bcrypt';

export const signupUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password,role} = req.body;
        // Check if the email is already registered
        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Signup({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: error.message });
    }
};

export const  getSignupUser = async (req,res) =>{
    try{
        const signUpUser = await Signup.find({})
        res.status(200).json(signUpUser);
    }
   catch(error){
    res.status(500).json({error: error.message})
   }
}

export const getSpecificSignUpUser = async(req,res) =>{
    const {id} = req.params;
    try{
        const signUpUser = await Signup.findById(id)
        res.status(200).json(signUpUser);
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

