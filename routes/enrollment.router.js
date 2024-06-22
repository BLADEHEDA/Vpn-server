import { getAllEnrollments,createEnrollment,editEnrollment,getSpecificEnrollment } from "../controllers/enrollment.controller.js";
import express from 'express'

const router = express.Router()

router.get('/',getAllEnrollments);
router.post('/',createEnrollment)
router.put('/:id',editEnrollment)
router.get('/:id',getSpecificEnrollment)

export default router;