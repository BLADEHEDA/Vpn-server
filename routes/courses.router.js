import {getAllCourses,addCourses,getSpecificCourse,editCourse,deleteCourse} from '../controllers/courses.controller.js'
import express from 'express';

const router = express.Router();

router.get('/', getAllCourses)
router.post('/',addCourses)
router.get('/:id',getSpecificCourse)      
router.put('/:id',editCourse)
router.delete('/:id',deleteCourse)

export default router;