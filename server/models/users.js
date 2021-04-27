import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    bio: String,
    socialMedia: String,
    gender: String,
    dob: String,
    creditMessages: Number
})

const celebritySchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    password: String,
    profession: String,
    description: String,
    followers: {
        type: String,
        default: 0
    }

})

const userDetails = mongoose.model('userDetails', userSchema)
const celebrityDetails = mongoose.model('celebrityDetails', celebritySchema)

export {
    userDetails,
    celebrityDetails
};