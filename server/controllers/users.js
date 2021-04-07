import { response } from 'express';
import { userDetails, celebrityDetails } from '../models/users.js';
import bcrypt from 'bcrypt';

const OTP={
    serviceID:"	VAa370d48c33fdc1a601adbb52dc40e8df",
    accountSID:"ACedbb4cb77b0bcc9c9a1076bf1e14f031",
    authToken:"9b466a0b29a22f5dfba3b74008ff8550"
}

import twilio from 'twilio'

var client = new twilio(OTP.accountSID, OTP.authToken);

export const getLogin = async(req, res) => {
    let response = {}

    try {
        let loginDetails = req.body
        console.log('in back',loginDetails);
        
        let user = await userDetails.find({ email: loginDetails.emailOrPhone })
        console.log('in back',loginDetails.password);
        console.log('in back',user[0].password);

        if(user){
            bcrypt.compare(loginDetails.password, user[0].password).then((status) => {
                if(status){
                    response.valid = true
                    console.log('in back valid',status);

                    res.json(response)
                }else{
                    response.wrong = true
                    console.log('in back wrong',status);

                    res.json(response)
                }
            })
        }else{
            response.notUser = true
            console.log('in back not user');

            res.json(response)
        }
    } catch (error) {
        
    }

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

export const sendOTP = async(req,res) => {
    console.log(req.body);
    var response = {}

    client
      .verify
      .services(OTP.serviceID)
      .verifications
      .create({
        to: `+91${req.body.phone}`,
        channel: req.body.method
      }).then((data) => {
        
        if(data){
            response.sent=true
            console.log(data);
            res.json(response)
        }
        
      }).catch((error)=>{
          console.log(error);
          if(error.status=400){
              response.invalid = true
              res.json(response)
          }
      })
}

export const verifyOTP =  (req,res) => {
    console.log('back',req.body);
    let userDetail = req.body.userDetails
    let status = {}

    client
    .verify
    .services(OTP.serviceID)
    .verificationChecks
    .create({
      to: `+91${req.body.phone}`, 
      code: req.body.VerifyOTP
    }).then(async(data) => {
      console.log(data);
      response.verified = true

      userDetail.password =await bcrypt.hash(userDetail.password, 10)
      console.log('**',userDetail.password);
      const newUser = new userDetails(userDetail)
            

            newUser.save().then((response) => {
                console.log('added',response);
                status.verified = true
                res.json(status)
            })
    }).catch((data) => {
      console.log('backinval',data);
      status.invalid = true
      res.json(status)
    })
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

export const googleSignup = async(req,res) => {
    const user = req.body
    console.log('in back',user);
    let existingAccount = await userDetails.find({ email: user.email })
    if(existingAccount){
        res.json(existingAccount)
    }else{
        const newUser = new userDetails(user)            

        newUser.save().then((response) => {
                
            res.json(response)
        })
    }
}

export const addProfilePic =  (req,res) => {
    console.log('back');
    let response = {}
    try {
        let id = 'test'
        let profilePic = req.body.profilePic
        console.log(req.body)
        profilePic.mv('../public/images/profile-pictures/' + id + '.jpg')
        response.success = true
        res.json(response)
    } catch {

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