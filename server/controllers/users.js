import {
    response
} from 'express';
import {
    userDetails,
    celebrityDetails
} from '../models/users.js';
import bcrypt from 'bcrypt';
import base64ToImage from 'base64-to-image';
import Razorpay from "razorpay";
import crypto from 'crypto';
import multer from 'multer'
import voucher_codes from 'voucher-code-generator'
// require("dotenv").config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/profile-pictures')
    },
    filename: (req, file, cb) => {
      cb(null, 'testing')
    }
  })

const celebrityPhotoUpload = multer({ storage: storage }).single('file')

// const OTP = {
//     serviceID: "	VAa370d48c33fdc1a601adbb52dc40e8df",
//     accountSID: "ACedbb4cb77b0bcc9c9a1076bf1e14f031",
//     authToken: "9b466a0b29a22f5dfba3b74008ff8550"
// }


const OTP = {
    serviceID: "VAa370d48c33fdc1a601adbb52dc40e8df",
    accountSID: "ACedbb4cb77b0bcc9c9a1076bf1e14f031",
    authToken: "4d9c32661d3e515d1f512e9238e48444"
}

import twilio from 'twilio'
import fs from 'fs'
import jwt from 'jsonwebtoken'

import mongoose from "mongoose";
import {
    resolve
} from 'path';

var client = new twilio(OTP.accountSID, OTP.authToken);

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("Not authenticated")
    } else {
        jwt.verify(token, "stargramSecret", (err, decoded) => {
            if (err) {
                res.json({
                    auth: false,
                    message: "Failed to authenticate"
                })
            } else {
                req.userId = decoded._id
                next();
            }
        })
    }
}

export const getLogin = async (req, res) => {
    let response = {}

    try {
        let loginDetails = req.body


        let user = await userDetails.find({
            email: loginDetails.emailOrPhone
        })


        if (user.length > 0) {
            console.log('db', user[0].username);
            bcrypt.compare(loginDetails.password, user[0].password).then((status) => {
                if (status) {
                    response.valid = true
                    console.log('in back valid', status);

                    const id = user[0]._id
                    const token = jwt.sign({
                        id
                    }, "stargramSecret", {
                        expiresIn: 300000000000,
                    })
                    console.log('456', user[0]);
                    res.json({
                        auth: true,
                        token: token,
                        userId: user[0]._id,
                        username: user[0].username,
                        user: user[0]
                    })
                } else {
                    console.log('in back wrong', status);

                    res.json({
                        auth: false,
                        message: "invalid credentials",
                        wrong: true
                    })
                }
            })
        } else {
            response.notUser = true
            console.log('in back not user');
            res.json({
                auth: false,
                message: "no user exists",
                notUser: true
            })
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

export const checkExisting = async (req, res) => {
    const values = req.body
    console.log('ok ipparam ethi', values);
    let response = {}

    try {
        let existingEmail = await userDetails.find({
            email: values.email
        })
        let celebrityExistingEmail = await celebrityDetails.find({
            email: values.email
        })
        let existingPhone = await userDetails.find({
            phone: values.phone
        })
        let celebrityExistingPhone = await celebrityDetails.find({
            phone: values.phone
        })
        let existingUsername = await userDetails.find({
            displayName: values.displayName
        })
        let celebrityExistingDisplayName = await celebrityDetails.find({
            displayName: values.displayName
        })

        let inputReferral = values.referralCode
        var referred = 'normal'
        var referredBy
        console.log('input Referral',inputReferral)

        if(inputReferral){
            referredBy = await userDetails.findOne({referralCode: inputReferral})
            if(referralCode){
                referred = 'correct'
            }else{
                referred = 'wrong'
            }
            console.log('referral',referralCode)
        }
        
        if(referred == 'wrong'){
            res.json({referralWrong: true})
        }
        else if (existingEmail.length > 0 && celebrityExistingEmail.length > 0) {
            console.log('mail');
            response.existingEmail = true
            console.log(response);

            res.json(response)
        } else if (existingPhone.length > 0 && celebrityExistingPhone.length > 0) {
            console.log('phone');
            response.existingPhone = true

            res.json(response)
        } else if (existingUsername.length > 0 && celebrityExistingDisplayName.length > 0) {
            console.log('displayName');
            response.existingDisplayName = true

            res.json(response)
        } else {
            console.log('not existing');

            if(referred == 'normal'){
                response.referredBy = 'none'                
            }else if(referred == 'correct'){
                response.referredBy = referredBy[0].displayName
            }

            response.newUser = true
            res.json(response)

        }

    } catch (error) {

    }
}

export const sendOTP = async (req, res) => {
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

            if (data) {
                response.sent = true
                console.log(data);
                res.json(response)
            }

        }).catch((error) => {
            console.log(error);
            if (error.status = 400) {
                response.invalid = true
                res.json(response)
            }
        })
}

export const verifyOTP = (req, res) => {
    console.log('back', req.body);
    let userDetail = req.body.userDetails
    let status = {}

    client
        .verify
        .services(OTP.serviceID)
        .verificationChecks
        .create({
            to: `+91${req.body.phone}`,
            code: req.body.VerifyOTP
        }).then(async (data) => {
            console.log(data);
            response.verified = true

            userDetail.password = await bcrypt.hash(userDetail.password, 10)
            console.log('**', userDetail.password);
            
            if(userDetail.referredBy != 'none'){
                userDetails.updateOne({displayName:userDetail.referredBy},{$inc:{referralCount:1}})
            }

            let newCode = voucher_codes.generate({
                length: 6,
                count: 1
            });
            console.log('new code ** : ',newCode)

            userDetail.referralCode = newCode

            userDetail.creditMessages = 1

            const newUser = new userDetails(userDetail)


            newUser.save().then((response) => {
                console.log('added', response);
                status.verified = true
                const id = response._id
                const token = jwt.sign({
                    id
                }, "stargramSecret", {
                    expiresIn: 300000000000,
                })
                res.json({
                    auth: true,
                    token: token,
                    userId: response._id,
                    username: response.displayName,
                    referredUser: true
                })
            })

        }).catch((data) => { 
            console.log('backinval', data);
            status.invalid = true
            res.json(status)
        })
}

export const userSignup = async (req, res) => {
    const user = req.body
    console.log('ipparam', user);

    let response = {}

    //errors = "This username isn't available. Please try another., Another account is using umeredava@gmail.com."

    try {
        console.log('keripporu..', user)

        // Checking whether he/she is an existing user
        let existingEmail = await userDetails.find({
            email: user.email
        })
        let existingPhone = await userDetails.find({
            phone: user.phone
        })

        console.log('eda kallaa', existingEmail, existingPhone);

        if (existingEmail.length > 0) {
            console.log('em');
            response.existingEmail = true

            res.json(response)
        } else if (existingPhone.length > 0) {
            console.log('ph');
            response.existingPhone = true

            res.json(response)
        } else {
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

export const googleSignup = async (req, res) => {
    const user = req.body
    console.log('in back', user);
    let existingAccount = await userDetails.find({
        email: user.email
    })
    if (existingAccount) {

        res.json(existingAccount)
    } else {
        const newUser = new userDetails(user)

        newUser.save().then((response) => {
            console.log('in back', response);
            res.json(response)
        })
    }
}

export const googleLogin = async (req, res) => {
    const user = req.body
    console.log('back', user);
    let existingAccount = await userDetails.find({
        email: user.email
         
    })
    let existingStarAccount = await celebrityDetails.find({
        email: user.email         
    })
    console.log('exis',existingAccount,existingStarAccount)
    if (existingAccount&&existingStarAccount) {
        console.log('in if')
        if(existingAccount.length>0){
            var id = existingAccount[0]._id 
            const token = jwt.sign({
                id
            }, "stargramSecret", {
                expiresIn: 30000000000000,
            })
            console.log('google jwt success')
            res.json({
                auth: true,
                token: token,
                userId: existingAccount[0]._id,
                username: existingAccount[0].username,
                user: existingAccount[0]
            })
        }
        else{
            var id = existingStarAccount[0]._id
            const token = jwt.sign({
                id
            }, "stargramSecret", {
                expiresIn: 30000000000000,
            })
            console.log('google jwt success')
            res.json({
                auth: true,
                token: token,
                userId: existingStarAccount[0]._id,
                username: existingStarAccount[0].username,
                user: existingStarAccount[0]
            })
        } 
        
    } else {
        const newUser = new userDetails(user)

        newUser.save().then((response) => {
            console.log('in back', response);
            res.json(response)
        })
    }
}

export const addProfilePic = (req, res) => {
    console.log('in back', req.body);
    let id = 'test'
    let profilePic = req.body.profilePic
    console.log('back', profilePic, id);

    let response = {}
    try {


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

export const profile = (req, res) => {

    try {
        let user = userDetails.find({
            email: "umeredava@gmail.com"
        })
        res.json(user)
    } catch (error) {
        console.log(error);
    }

    // return(chatMessage.json({ success: true, chatMessage}))
}

export const getUserDetails = async (req, res) => {
    try {
        let user = await userDetails.findOne({
            _id: mongoose.Types.ObjectId(req.userId)
        })
        console.log('user', user);
        res.json(user)
    } catch (error) {

    }
}

export const changeProfilePic = (req, res) => {
    try {
        console.log('here');
        let userId = req.body.userId
        // console.log('body',req.files)
        var base64Str = req.body.profilePic;
        var path = "./public/images/profile-pictures/";
        var optionalObj = {
            'fileName': userId,
            'type': 'jpg'
        };

        base64ToImage(base64Str, path, optionalObj);


        res.send('/images/profile-pictures/' + req.body.userId + '.jpg')

    } catch (error) {

    }
}

export const changeUserDetails = async (req, res) => {
    try {
        console.log('back', req.body);
        const userDoc = await userDetails.findOne({
            _id: mongoose.Types.ObjectId(req.userId)
        });
        console.log('user doc', userDoc);

        userDoc.username = req.body.userDetails.username
        userDoc.email = req.body.userDetails.email
        userDoc.socialMedia = req.body.userDetails.socialMedia
        userDoc.bio = req.body.userDetails.bio
        userDoc.gender = req.body.userDetails.gender
        userDoc.dob = req.body.userDetails.dob

        await userDoc.save();

    } catch (error) {
        console.log(error);
    }
}

export const buyMessages = async (req, res) => {

    try {

        console.log('buyback******/\*******', req.body)


        if (req.body.messagePack == 'Basic') {

            var amount = 20

        } else if (req.body.messagePack == "Recommended") {

            amount = 60

        } else if (req.body.messagePack == 'SuperSaver') {

            amount = 120

        }

        console.log('amountee', amount)

        const instance = new Razorpay({
            key_id: 'rzp_test_pq8S6HNUCPVXHT',
            key_secret: 'UYHO1TeyMC1Jf5mem4p2hqh2',

        });

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }

}

export const paymentSuccess = (req, res) => {
    try {
        console.log('verification...', req.body);
        // const crypto = require('crypto');
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        console.log('calculation is calculation', orderCreationId, razorpayPaymentId, razorpaySignature);

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, UYHO1TeyMC1Jf5mem4p2hqh2);
        let shasum = crypto.createHmac("sha256", "UYHO1TeyMC1Jf5mem4p2hqh2");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature) {
            console.log('not verified');
            return res.status(400).json({
                msg: "Transaction not legit!"
            });

        } else {
            console.log('verified');
            // THE PAYMENT IS LEGIT & VERIFIED
            // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

            res.json({
                msg: "success",
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
            });
        }


    } catch (error) {
        res.status(500).send(error);
    }
}

export const addCredit = async (req, res) => {
    try {
        console.log('add', req.body, req.userId);
        let buyMessageCount = req.body.messageCount
        let currentCredit = await userDetails.findOne({
            _id: mongoose.Types.ObjectId(req.userId)
        }, {
            creditMessages: 1,
            _id: 0
        })
        let currentCount = currentCredit.creditMessages
        console.log('current', currentCount);
        currentCount = currentCount + buyMessageCount
        console.log('added', currentCount);

        return new Promise((resolve, reject) => {
            userDetails.updateOne({
                _id: mongoose.Types.ObjectId(req.userId)
            }, {$set:{
                creditMessages: currentCount,
               }  
            }).then((response)=>{
                console.log('resposness',response);
            })

            resolve(res.json({added:true}))
        })
    } catch (error) {
        console.log(error);
    }
}

export const sendCelebrityOTP = (req,res) => {
    console.log('otp', req.body.phone);
    client
        .verify
        .services(OTP.serviceID)
        .verifications
        .create({
            to: `+91${req.body.phone}`,
            channel: 'sms'
        }).then((data) => {

            if (data) {
                response.sent = true
                console.log(data);
                res.json(response)
            }

        }).catch((error) => {
            console.log(error);
            if (error.status = 400) {
                response.invalid = true
                res.json(response)
            }
        })
}

export const verifyCelebrityOTP = (req,res) => {
    // console.log('file',req.files)
    console.log('reqqq',req.body)
    console.log('otppp',req.body.otp)
    
    let celebrityDetail = req.body.data
    celebrityDetail.verified = false
    console.log('details',celebrityDetail)
    client
        .verify
        .services(OTP.serviceID)
        .verificationChecks
        .create({
            to: `+91${req.body.data.phone}`,
            code: req.body.otp
        }).then(async (data) => {
            console.log(data);
            response.verified = true

            celebrityDetail.password = await bcrypt.hash(celebrityDetail.password, 10)
            console.log('**', celebrityDetail.password);
            const newCelebrity = new celebrityDetails(celebrityDetail)

            newCelebrity.save().then((response) => {
                console.log('added', response);
                const id = response._id

                // celebrityPhotoUpload(req, res, (err) => {
                //     if (err) {
                //         console.log('file not uploaded')
                //     }else{
                //         console.log('UPloaDed Successfully')
                //     }
                // });

                const token = jwt.sign({
                    id
                }, "stargramSecret", {
                    expiresIn: 300000000000,
                })

                res.json({
                    auth: true,
                    token: token,
                    starId: response._id,
                    starname: response.displayName
                })

                // res.json({
                //     verified:true,
                //     starId:id
                // })
            })

        }).catch((data) => { 
            console.log('backinval', data);
            let response = {}
            response.invalid = true
            res.json(response)
        })
}

export const checkCelebrityExisting = async (req,res) => {
    try {
        console.log('checking in back celebrity',req.body);
        let existingCelebrity =await celebrityDetails.findOne(
            {
              $or: [
                     { email : req.body.email },
                     { phone: req.body.phone },
                     { displayName: req.body.displayName}
                   ]
            }
        )

        let existingUser =await userDetails.findOne(
            {
              $or: [
                     { email : req.body.email },
                     { phone: req.body.phone },
                     { displayName: req.body.displayName}
                   ]
            }
        )

        if(existingUser && existingCelebrity){
            console.log('exisss')
            res.json({existing:true})
        }else{
            res.json({newUser:true})
        }
    } catch (error) {
        
    }
}

export const checkCelebrityVerification = async (req,res) => {
    try {
        console.log('verification',req.starId)
        let verified = await celebrityDetails.findOne({
            _id: mongoose.Types.ObjectId(req.starId)
        }, {
            verified: 1,
            _id:0
        })

        if(verified){
            console.log('verified',verified)
            res.json({verified:true})
        }else{
            console.log('not verified', verified)
            res.json({notVerified:true})
        }
    } catch (error) {
        
    }
}

export const addImage = (req,res) => {
    try {
        console.log('yes in here');
        // let starId = req.body.starId
        // celebrityPhotoUpload(req, res, (err) => {
        //     if (err) {
        //         console.log('error happened',err)
        //     }else{
        //         console.log('UPloadDED')
        //         const token = jwt.sign({
        //             starId
        //         }, "stargramSecret", {
        //             expiresIn: 300000000000,
        //         })

        //         res.json({
        //             auth: true,
        //             token: token,
        //             starId: response._id,
        //             starname: response.displayName
        //         })
        //     }
        //   });

        if(req.files){
            console.log('file und')
            let file = req.files.file
            file.mv('./public/images/profile-pictures'+"custom-name"+'.jpg')
        }else{
            console.log("file illa")
        }
    } catch (error) {
        
    }
}

export const getAllVerifiedCelebrities = async(req,res) => {
    let verifiedCelebrities =await celebrityDetails.find({verified:true})
    console.log('verified stars', verifiedCelebrities)
    res.json({verifiedCelebrities:verifiedCelebrities})
}

export const getCelebrityDetails = async (req,res) => {
    let starId = req.query.starId
    console.log('starId',starId)
    let starDetails = await celebrityDetails.findOne({_id:mongoose.Types.ObjectId(starId)})
    console.log('details',starDetails)
    res.json(starDetails)
}

// export const addPost = (req,res) => {
//     try {
//         console.log('yes in here');
//         celebrityPhotoUpload(req, res, (err) => {
//             if (err) {
//               res.sendStatus(500);
//             }
//             res.send(req.file);
//           });
//     } catch (error) {
        
//     }
// }