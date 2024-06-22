import { Exam } from "../models/exam.model.js";
import moment from "moment";

export const getAllExams = async(req,res)=>{
    try{
        const exam = await Exam.find({});   
        res.status(200).json(exam);
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const addExams= async (req,res) =>{
    try{
        const exam = await Exam.create(req.body)   
        res.status(200).json(exam);
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getSpecificExam = async(req,res)=>{
    try{
        const {id}= req.params
        const exam = await Exam.findById(id)  ;
        res.status(200).json(exam);
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const editExams = async(req,res)=>{
    try{
        const {id}= req.params
        const exam = await Exam.findByIdAndUpdate(id,req.body)   
        if(!exam){
            return res.status(404).json(`Cannot find exam with id ${id} in the database`)
        }
        res.status(200).json(exam);
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deleteExam = async(req,res)=>{
    try{
        const {id}= req.params
        const exam = await Exam.findByIdAndDelete(id,req.body)   
        if(!exam){
            return res.status(404).json(`Cannot find exam with id ${id} in the database`)
        }
        res.status(200).json(exam);
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}