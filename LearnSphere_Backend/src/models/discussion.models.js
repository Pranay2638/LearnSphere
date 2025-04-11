import mongoose from 'mongoose'

const discussionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const Discussion = mongoose.model("Discussion", discussionSchema)