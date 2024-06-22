import { StudentCoursesExams } from "../models/StudentCoursesExams.model.js";
import { Student } from "../models/student.model.js";
import { Exam } from "../models/exam.model.js";
import { Courses } from "../models/course.model.js";

export const getAllstudentCourseExam = async (req,res) =>{
    try {
        const StudentCoursesExam =  await StudentCoursesExams.find({})
        res.status(200).json(StudentCoursesExam);
    }
    catch(error){
        res.status(500).json({message: error.message});      
    }  
}

export const getSpicificExamination = async (req,res) =>{
    try {
        const {id} = req.params
        const StudentCoursesExam =  await StudentCoursesExams.findById(id)
        res.status(200).json(StudentCoursesExam);
    }
    catch(error){
        res.status(500).json({message: error.message});      
    }  
}

export const addExamination = async (req, res) => {
    try {
        const { matricule, courseCode, examId, semester, caMark, examMark } = req.body;

        if (!matricule || !courseCode || !examId || !semester || !caMark || !examMark) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const student = await Student.findOne({ matricule });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const course = await Courses.findOne({ courseCode });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        const newStudentCoursesExam = new StudentCoursesExams({
            student: student._id,
            course: course._id,
            exam: exam._id,
            semester,
            caMark,
            examMark
        });

        await newStudentCoursesExam.save();

        res.status(201).json({ message: "Examination added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




