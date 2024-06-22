import express from 'express'
import {deleteExam ,editExams,getSpecificExam,addExams,getAllExams} from '../controllers/exam.controller.js'

const router = express.Router();

router.get('/',getAllExams);
router.post('/',addExams);
router.get('/:id',getSpecificExam);
router.put('/:id',editExams);
router.delete('/:id',deleteExam);

export default router;