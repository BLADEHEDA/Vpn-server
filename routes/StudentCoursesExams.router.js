import express from 'express';
import {getAllStudentCourseExam,getSpicificExamination,addExamination } from '../controllers/StudentCoursesExams.controller.js'

const router = express.Router();

router.get('/',getAllStudentCourseExam)
router.get('/:id',getSpicificExamination) 
router.post('/',addExamination)

export default router;