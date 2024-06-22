import { LecturerCourse } from "../models/lecturerCourse.model.js";
import { Signup } from "../models/signUp.model.js";
import { Courses } from "../models/course.model.js";
import mongoose from "mongoose";


export const getAllLecturerCOurse = async (req,res) =>{
    try{
        const lecturerCourses = await LecturerCourse.find({});
        res.status(200).json(lecturerCourses); 
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
}

export const addnewlecturerCourse = async (req, res) => {
    const { lecturerId, courseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(lecturerId) || !mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid lecturerId or courseId' });
    }

    try {
        const lecturerCourse = new LecturerCourse({ lecturerId, courseId });

        const lecturer = await Signup.findById(lecturerId)
        const course = await Courses.findById(courseId)

    //    Update the lecurer's courses
       lecturer.courses.push(course._id) 
       await lecturer.save()

        // Update the courses' lecturers
        course.lecturers.push(lecturer._id)
         await course.save()
  
        await lecturerCourse.save();
        res.status(201).json(lecturerCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
};

export const getAllSpecificLecturerCOurse = async (req,res) =>{
    try{
        const {id} = req.params
        const lecturerCourses = await LecturerCourse.findById(id);
        res.status(200).json(lecturerCourses); 
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
}

