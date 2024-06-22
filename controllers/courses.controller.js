import { Courses } from "../models/course.model.js";

export const getAllCourses = async (req, res) => {
    try {
        const course = await Courses.find({});
        res.status(200).json(course);    
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addCourses = async (req, res) => {
    try {
        const course = await Courses.create(req.body)
        res.status(200).json(course)

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getSpecificCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Courses.findById(id);
        if (!course) {
            return res.status(404).json(`Cannot find course with id ${id} in the database`);
        }
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params
        const course = await Courses.findByIdAndDelete(id, req.body)
        if (!course) {
            return res.status(404).json(`Cannot find course with id ${id} in the database`)
        }
        res.status(200).json(course)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const editCourse = async (req, res) => {
    try {
        const { id } = req.params
        const course = await Courses.findByIdAndUpdate(id, req.body)
        if (!course) {
            return res.status(404).json(`Cannot find course with id ${id} in the database`)
        }
        res.status(200).json(course)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
