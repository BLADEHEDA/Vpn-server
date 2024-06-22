import express from 'express';
import { getAllstudens,addStudents,getSpecificStudent,editStudentDetails,deleteStudent} from '../controllers/students.controller.js';


const router = express.Router();
  
router.get('/',getAllstudens);

router.post('/',addStudents)  

router.get('/:id',getSpecificStudent)

router.delete('/:id',deleteStudent)

router.put('/:id',editStudentDetails)

export default router;