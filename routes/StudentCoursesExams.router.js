import express from 'express';
import {getAllstudentCourseExam,getSpicificExamination,addExamination } from '../controllers/StudentCoursesExams.controller.js'

const router = express.Router();

router.get('/',getAllstudentCourseExam)
router.get('/:id',getSpicificExamination) 
router.post('/',addExamination)

export default router;