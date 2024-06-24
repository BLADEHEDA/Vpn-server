import express from 'express'
import { addnewlecturerCourse,getAllLecturerCOurse,getAllSpecificLecturerCourse } from '../controllers/lecturerCourse.controller.js';

const router = express.Router();

router.post('/',addnewlecturerCourse)
router.get('/',getAllLecturerCOurse) 
router.get('/:id',getAllSpecificLecturerCourse) 

export default router 