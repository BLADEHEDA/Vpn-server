import express from 'express';
import { signupUser,getSignupUser,getSpecificSignUpUser,deteteSpecificSignUpUser,editSignUpUser } from '../controllers/signUp.controller.js';

const router = express.Router();

router.post('/', signupUser);
router.get('/', getSignupUser);
router.get('/:id', getSpecificSignUpUser); 
router.delete('/:id', deteteSpecificSignUpUser); 
router.put('/:id',editSignUpUser)

export default router;
