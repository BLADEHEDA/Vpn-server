import express from 'express'
import {createsetExams,getAllSetExams,getSpricifSetExams} from '../controllers/lecturerCoursesExams.controller.js'

const router = express.Router();

router.get('/',getAllSetExams)
router.get('/:id',getSpricifSetExams);
router.post('/',createsetExams)

export default router;