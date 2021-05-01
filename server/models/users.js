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
    creditMessages: Number,
    followers: {
        type: Number,
        default: 0
    },
    messages: {
        type: Number,
        default: 0
    }
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
    creditMessages: Number,
    verified: Boolean,
    followers: {
        type: Number,
        default: 0
    },
    messages: {
        type: Number,
        default: 0
    }
})

const userDetails = mongoose.model('userDetails', userSchema)
const celebrityDetails = mongoose.model('celebrityDetails', celebritySchema)

export {
    userDetails,
    celebrityDetails
};