import { StudentCoursesExams } from "../models/StudentCoursesExams.model.js";
import { Student } from "../models/student.model.js";
import { Exam } from "../models/exam.model.js";
import { Courses } from "../models/course.model.js";

export const getAllStudentCourseExam = async (req, res) => {
    try {
        const studentCoursesExams = await StudentCoursesExams.find({});
        let modifiedResponse = [];

        // Iterate through each StudentCoursesExam
        for (let i = 0; i < studentCoursesExams.length; i++) {
            const studentCourseExam = studentCoursesExams[i];

            const student = await Student.findById(studentCourseExam.student);
            if (!student) {
                throw new Error(`Student with id ${studentCourseExam.student} not found`);
            }
            const course = await Courses.findById(studentCourseExam.course);
            if (!course) {
                throw new Error(`COurse with id ${studentCourseExam.course} not found`);
            }
            const modifiedObject = {
                _id: studentCourseExam._id,
                student: {
                    _id: student._id,
                    matricule: student.matricule,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email
                },
                course: {
                    _id: course._id,
                    courseCode: course.courseCode,
                    courseName: course.courseName
                },
                exam: studentCourseExam.exam,
                caMark: studentCourseExam.caMark,
                examMark: studentCourseExam.examMark,
                createdAt: studentCourseExam.createdAt,
                updatedAt: studentCourseExam.updatedAt,
                __v: studentCourseExam.__v
            };
            modifiedResponse.push(modifiedObject);
        }

        // Return the modified response
        res.status(200).json(modifiedResponse);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getSpicificExamination = async (req, res) => {
    try {
        const { id } = req.params
        let modifiedResponse = [];
        const studentCourseExam = await StudentCoursesExams.findById(id)
        if (!studentCourseExam) {
            return res.status(404).json({ message: `Enrollment with ID ${id} not found` });
        }

        const student = await Student.findById(studentCourseExam.student);
        if (!student) {
            throw new Error(`Student with id ${studentCourseExam.student} not found`);
        }
        const course = await Courses.findById(studentCourseExam.course);
        if (!course) {
            throw new Error(`COurse with id ${studentCourseExam.course} not found`);
        }

        const modifiedObject = {
            _id: studentCourseExam._id,
            student: {
                _id: student._id,
                matricule: student.matricule,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email
            },
            course: {
                _id: course._id,
                courseCode: course.courseCode,
                courseName: course.courseName
            },
            exam: studentCourseExam.exam,
            caMark: studentCourseExam.caMark,
            examMark: studentCourseExam.examMark,
            createdAt: studentCourseExam.createdAt,
            updatedAt: studentCourseExam.updatedAt,
            __v: studentCourseExam.__v
        };
        res.status(200).json(modifiedObject);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addExamination = async (req, res) => {
    try {
        const { matricule, courseCode, examId, caMark, examMark } = req.body;

        if (!matricule || !courseCode || !examId || !caMark || !examMark) {
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
            caMark,
            examMark
        });

        await newStudentCoursesExam.save();

        res.status(201).json({ message: "Examination added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




