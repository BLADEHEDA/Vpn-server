import { User } from '../models/userModel.js'

export const getAllUsers = async (req, res) => {
    try{
        const user = await User.find({})
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
} 

export const addUsers = async (req, res) => { 
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getSpecificUser =  async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const editUserDetails = async(req, res) => {
    const { id } = req.params
    try{
        const user = await User.findByIdAndUpdate(id,req.body)
        if(!user){
           return res.status(400).json(`Cannot find user with id ${id} in the database`)  
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deleteUser = async(req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findByIdAndDelete(id,req.body)
        if(!user){
           return res.status(404).json(`Cannot find user with id ${id} in the database`)  
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}