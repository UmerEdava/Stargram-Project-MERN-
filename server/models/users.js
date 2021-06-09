import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    displayName: String,
    password: String,
    email: String,
    phone: Number,
    bio: String,
    socialMedia: String,
    gender: String,
    dob: String,
    creditMessages: {
        type: Number,
        default: 0
    },
    referralCode : String,
    referredBy : String,
    referralCount : Number,
    followers: [String],
    messages: {
        type: Number,
        default: 0
    },
    messageSent: {
        type: Boolean,
        default: false
    },
    messageReceived: {
        type: Boolean,
        default: false
    },
    sentMessagesCount: {
        type: Number,
        default: 0
    },
    receivedMessagesCount: {
        type: Number,
        default: 0
    },
    wallet: {
        type: Number,
        default: 0
    },
    favourites: Array
})

const celebritySchema = mongoose.Schema({
    displayName: String,
    email: String,
    phone: Number,
    password: String,
    bio: String,
    socialMedia: String,
    gender: String,
    dob: String,
    profession: String,
    description: String,
    creditMessages: {
        type: Number,
        default: 0
    },
    verified: Boolean,
    followers: [String],
    messages: {
        type: Number,
        default: 0
    },
    messageSent: {
        type: Boolean,
        default: false
    },
    messageReceived: {
        type: Boolean,
        default: false
    },
    sentMessagesCount: {
        type: Number,
        default: 0
    },
    receivedMessagesCount: {
        type: Number,
        default: 0
    },
    wallet: {
        type: Number,
        default: 0
    },
    favourites: Array
})

const chatSchema = mongoose.Schema({
    sender: String,
    receiver: String,
    date: String
})

const userDetails = mongoose.model('userDetails', userSchema)
const celebrityDetails = mongoose.model('celebrityDetails', celebritySchema)
const chatDetails = mongoose.model('chatDetails', chatSchema)

export {
    userDetails,
    celebrityDetails,
    chatDetails
};