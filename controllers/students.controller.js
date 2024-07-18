import { Student } from '../models/student.model.js'

export const getAllstudens = async (req, res) => { 
    try{
        const student = await Student.find({}) 
        res.status(200).json(student)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const addStudents = async (req, res) => {
    try {
        // Check if the request body is an array
        const students = Array.isArray(req.body) ? req.body : [req.body];
        const addedStudents = await Student.insertMany(students);
        res.status(200).json(addedStudents);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSpecificStudent = async (req, res) => { 
    const { id } = req.params;
    try {
        const student = await Student.findById(id); 
        if (!student) {
            return res.status(404).json(`Cannot find user with id ${id} in the database`);
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const editStudentDetails = async(req, res) => { 
    const { id } = req.params
    try{
        const student = await Student.findByIdAndUpdate(id,req.body)
        if(!student){
           return res.status(400).json(`Cannot find user with id ${id} in the database`)  
        }
        res.status(200).json(student)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deleteStudent = async(req, res) => { 
    const { id } = req.params;
    try{
        const student = await Student.findByIdAndDelete(id,req.body)
        if(!student){
           return res.status(404).json(`Cannot find user with id ${id} in the database`)  
        }
        res.status(200).json(student)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}   