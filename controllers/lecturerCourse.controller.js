import { LecturerCourse } from "../models/lecturerCourse.model.js";
import { Signup } from "../models/signUp.model.js";
import { Courses } from "../models/course.model.js";
import mongoose from "mongoose";

export const getAllLecturerCOurse = async (req, res) => {
    try {
        const lecturerCourses = await LecturerCourse.find({});

        // Map through enrollments to fetch related student and course details
        const enrichedEnrollments = await Promise.all(lecturerCourses.map(async (enrollment) => {
            try {
                const lecturer = await Signup.findById(enrollment.lecturerId);
                const course = await Courses.findById(enrollment.courseId);

                if (!lecturer || !course) {
                    return null;
                }

                return {
                    _id: enrollment._id,
                    lecturer: {
                        id: lecturer._id,
                        firstName: lecturer.firstName,
                        lastName: lecturer.lastName,
                        email: lecturer.email,
                        role: lecturer.role,
                    },
                    course: {
                        id: course._id,
                        courseName: course.courseName,
                        courseCode: course.courseCode,
                        creditValue: course.creditValue,
                        department: course.department,
                        has_prerequisite: course.has_prerequisite
                    },
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


export const getAllSpecificLecturerCourse = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the enrollment by ID
        const enrollment = await LecturerCourse.findById(id);
        if (!enrollment) {
            return res.status(404).json({ message: `Enrollment with ID ${id} not found` });
        }

        // Find the student associated with the enrollment
        const lecturer = await Signup.findById(enrollment.lecturerId);
        if (!lecturer) {
            return res.status(404).json({ message: `Student with ID ${enrollment.lecturerId} not found` });
        }

        // Find the course associated with the enrollment
        const course = await Courses.findById(enrollment.courseId);
        if (!course) {
            return res.status(404).json({ message: `Course with ID ${enrollment.courseId} not found` });
        }

        // Construct the response object
        const specificEnrollment = {
            _id: enrollment._id,
            lecturer: {
                id: lecturer._id,
                firstName: lecturer.firstName,
                lastName: lecturer.lastName,
                email: lecturer.email,
                role: lecturer.role,
            },
            course: {
                id: course._id,
                courseName: course.courseName,
                courseCode: course.courseCode,
                creditValue: course.creditValue,
                department: course.department,
                has_prerequisite: course.has_prerequisite
            },
        };

        res.status(200).json(specificEnrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
