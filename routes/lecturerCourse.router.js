import express from 'express'
import { addnewlecturerCourse,getAllLecturerCOurse,getAllSpecificLecturerCOurse } from '../controllers/lecturerCourse.controller.js';

const router = express.Router();

router.post('/',addnewlecturerCourse)
router.get('/',getAllLecturerCOurse) 
router.get('/',getAllSpecificLecturerCOurse) 

export default router 