import { response } from 'express';
import { userDetails, celebrityDetails } from '../models/users.js';
import bcrypt from 'bcrypt';



export const getLogin = (req, res) => {

}

export const home = async (req, res) => {
    try {
        const allCelebrities = await celebrityDetails.find()

        res.status(200).json(allCelebrities)
    } catch {
        res.status(404).json({
            message: error.message
        })
    }
}

export const checkExisting = async(req,res) => {
    const values = req.body
    console.log('ok ipparam ethi', values);
    let response = {}

    try {
        let existingEmail = await userDetails.find({ email: values.email })
        let existingPhone = await userDetails.find({ phone: values.phone })    
        let existingUsername = await userDetails.find({ username: values.username })     
        
        if(existingEmail.length>0){
            console.log('mail');
            response.existingEmail=true
            console.log(response);

            res.json(response) 
        }else if(existingPhone.length>0){
            console.log('phone');
            response.existingPhone=true

            res.json(response)   
        }else if(existingUsername.length>0){
            console.log('username');
            response.existingUsername=true

            res.json(response)   
        } else{
            console.log('not existing');

            response.newUser=true
            res.json(response)   

        }

    } catch (error) {
        
    }
}

export const userSignup = async(req, res) => {
    const user = req.body
    console.log('ipparam',user);
    
    let response = {}

    //errors = "This username isn't available. Please try another., Another account is using umeredava@gmail.com."
    
    try {
        console.log('keripporu..',user)

        // Checking whether he/she is an existing user
        let existingEmail = await userDetails.find({ email: user.email })
        let existingPhone = await userDetails.find({ phone: user.phone })

        console.log('eda kallaa',existingEmail,existingPhone);

        if(existingEmail.length>0){
            console.log('em');
            response.existingEmail=true

            res.json(response) 
        }else if(existingPhone.length>0){
            console.log('ph');
            response.existingPhone=true

            res.json(response)   
        } else{
            console.log('not existing');

            // Hashing password
            user.password = await bcrypt.hash(user.password, 10)
            
            const newUser = new userDetails(user)
            

            newUser.save().then((response) => {
                
                res.json(response)
            })

            res.json(user)
        }

        

    } catch {
        res.status(409).json({
            message: error.message
        });
    }
}

export const addCelebrity = async (req, res) => {
    const celebrity = req.body
    const newCelebrity = new celebrityDetails(celebrity)
    try {
        await newCelebrity.save()

        res.status(201).json(newCelebrity)
    } catch {
        res.status(409).json({
            message: error.message
        });
    }
}