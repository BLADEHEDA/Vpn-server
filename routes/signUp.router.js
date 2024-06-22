import express from 'express';
import { signupUser,getSignupUser,getSpecificSignUpUser } from '../controllers/signUp.controller.js';

const router = express.Router();

router.post('/', signupUser);
router.get('/', getSignupUser);
router.get('/:id', getSpecificSignUpUser); 

export default router;
