import express from 'express';
import { getAllUsers, addUsers ,getSpecificUser,deleteUser,editUserDetails} from '../controllers/users.js';


const router = express.Router();
  
//get all the users from the datatbase
router.get('/',getAllUsers);

// add users to the datatbase 
router.post('/',addUsers)

// get a specific user
router.get('/:id',getSpecificUser)


// Delete a specific user
router.delete('/:id',deleteUser )

// Edit a user 
router.put('/:id',editUserDetails)

export default router;