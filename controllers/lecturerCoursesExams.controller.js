import { LecturerCoursesExams } from "../models/lecturerCoursesExams.model.js"
import { Courses } from "../models/course.model.js"
import { Exam } from "../models/exam.model.js"
import { Signup } from "../models/signUp.model.js"

export const getAllSetExams = async(req,res)=>{
try{
const lecturerSetExam = await LecturerCoursesExams.find({})
res.status(200).json(lecturerSetExam)
}
catch(error){
    res.status(500).json({message: error.message})
}
}

export const createsetExams = async (req, res) => {
    try {
        const { lecturerId, courseCode, examId } = req.body;

        if (!lecturerId || !courseCode || !examId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const lecturer = await Signup.findById(lecturerId);
        if (!lecturer) {
            return res.status(404).json({ message: "Lecturer not found" });
        }

        const course = await Courses.findOne({ courseCode });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        const newLecturerCoursesExams = new LecturerCoursesExams({
            lecturer: lecturer._id,
            course: course._id,
            exam: exam._id
        });

        await newLecturerCoursesExams.save();

        res.status(201).json({ message: "Exam set successfully by lecturer" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

    
    export const getSpricifSetExams = async(req,res)=>{
        try{
            const {id} = req.params
            const lecturerSetSpecificExam = await LecturerCoursesExams.findById(id)
            res.status(200).json(lecturerSetSpecificExam)
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
        }
        

