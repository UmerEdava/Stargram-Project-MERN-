import {userDetails,celebrityDetails} from '../models/users.js';

export const getLogin = (req,res)=>{
    
}

export const home = async(req,res)=>{
    try{
        const allCelebrities = await celebrityDetails.find()

        res.status(200).json(allCelebrities)        
    }catch{
        res.status(404).json({message: error.message})        
    }
}

export const addUser = (req,res)=>{
    try{

    }   catch{

    }     
}

export const addCelebrity = async(req,res)=>{
    const celebrity = req.body
    const newCelebrity = new celebrityDetails(celebrity)
    try{
        await newCelebrity.save()

        res.status(201).json(newCelebrity)
    }   catch{
           res.status(409).json({message:error.message});
    }     
}