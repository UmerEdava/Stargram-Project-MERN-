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
// require("dotenv").config();


const OTP = {
    serviceID: "	VAa370d48c33fdc1a601adbb52dc40e8df",
    accountSID: "ACedbb4cb77b0bcc9c9a1076bf1e14f031",
    authToken: "9b466a0b29a22f5dfba3b74008ff8550"
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
        let existingPhone = await userDetails.find({
            phone: values.phone
        })
        let existingUsername = await userDetails.find({
            username: values.username
        })

        if (existingEmail.length > 0) {
            console.log('mail');
            response.existingEmail = true
            console.log(response);

            res.json(response)
        } else if (existingPhone.length > 0) {
            console.log('phone');
            response.existingPhone = true

            res.json(response)
        } else if (existingUsername.length > 0) {
            console.log('username');
            response.existingUsername = true

            res.json(response)
        } else {
            console.log('not existing');

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
                    username: response.username
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
    console.log('exis',existingAccount)
    if (existingAccount) {
        const id = existingAccount[0]._id
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
    console.log('otp back', req.body);
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