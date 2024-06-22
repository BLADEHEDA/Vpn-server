import { Enrollment}  from "../models/enrollment.model.js";   // credits: course.credits,
import { Courses } from "../models/course.model.js";
import { Student } from "../models/student.model.js";

export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({});
        
        // Map through enrollments to fetch related student and course details
        const enrichedEnrollments = await Promise.all(enrollments.map(async (enrollment) => {
            try {
                const student = await Student.findById(enrollment.student);
                const course = await Courses.findById(enrollment.course);
                
                if (!student || !course) {
                    return null;
                }
                return {
                    _id: enrollment._id,
                    student: {
                        _id: student._id,
                        firstName: student.firstName,
                        lastName: student.lastName,
                        email: student.email,
                        matricule: student.matricule,
                        phone_number: student.phone_number
                    },
                    course: {
                        id: course._id,
                        courseName: course.courseName,
                        courseCode: course.courseCode,
                        creditValue: course.creditValue,
                        department: course.department,
                        has_prerequisite : course.has_prerequisite
                    },
                    academicYear: enrollment.academicYear,
                    attendanceCount: enrollment.attendanceCount
                };
            } catch (error) {
                console.error('Error fetching related data:', error);
                return null;
            }
        }));

        // Filter out null values (in case of errors or missing data)
        const filteredEnrollments = enrichedEnrollments.filter(enrollment => enrollment !== null);

        res.status(200).json(filteredEnrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEnrollment = async (req, res) => {
    try {
        const { matricule, courseCode, academicYear, attendanceCount } = req.body;

        // Find the student
        const student = await Student.findOne({ matricule });
        if (!student) {
            return res.status(404).json({ message: `Cannot find user with matricule ${matricule} in the database` });
        }

        // Find the course
        const course = await Courses.findOne({ courseCode });
        if (!course) {
            return res.status(404).json({ message: `Cannot find course with code ${courseCode} in the database` });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            student: student._id,
            course: course._id,
            academicYear: academicYear,
            attendanceCount: attendanceCount || 0
        });

        // Update the student's enrollments
        student.enrollments.push(course._id);
        await student.save();

         // Update the course's enrollments
        course.enrollments.push(student._id);
        await course.save();

        const completeEnrollment = {
            ...enrollment.toObject(),
            studentName: `${student.firstName} ${student.lastName}`,
            matricule: student.matricule,
            studentEmail: student.email,
            studentNumber: student.phone_number,
            studentImage: student.image
        };

        res.status(201).json(completeEnrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const editEnrollment = async(req,res) =>{
    try {
        const {id} = req.params
        const enrollments = await Enrollment.findByIdAndUpdate(id,req.body)
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

export const getSpecificEnrollment = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the enrollment by ID
        const enrollment = await Enrollment.findById(id);
        if (!enrollment) {
            return res.status(404).json({ message: `Enrollment with ID ${id} not found` });
        }

        // Find the student associated with the enrollment
        const student = await Student.findById(enrollment.student);
        if (!student) {
            return res.status(404).json({ message: `Student with ID ${enrollment.student} not found` });
        }

        // Find the course associated with the enrollment
        const course = await Courses.findById(enrollment.course);
        if (!course) {
            return res.status(404).json({ message: `Course with ID ${enrollment.course} not found` });
        }

        // Construct the response object
        const specificEnrollment = {
            _id: enrollment._id,
            student: {
                _id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                matricule: student.matricule,
                phone_number: student.phone_number
            },
            course: {
                _id: course._id,
                courseName: course.courseName,
                courseCode: course.courseCode,
                creditValue: course.creditValue,
                department: course.department,
                has_prerequisite: course.has_prerequisite
            },
            academicYear: enrollment.academicYear,
            attendanceCount: enrollment.attendanceCount
        };

        res.status(200).json(specificEnrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
