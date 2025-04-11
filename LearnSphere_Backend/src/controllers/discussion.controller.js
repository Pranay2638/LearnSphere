import asyncHandler from 'express-async-handler'
import {ApiError} from '../utils/ApiError.js'
import { Discussion } from '../models/discussion.models.js'

const createDiscussion = asyncHandler(async(req,res) => {
    const {title, message} = req.body
    if(!title || !message){
        throw new ApiError(401, "Title and meassage are required!")
    }
    
    try {
        const discussion = await Discussion.create({
            title,
            message,
            user: req.user._id
        })
        const populateDiscussion = await discussion.populate("user","username")
    
        req.io.emit("messageReceived", populateDiscussion)
        return res.status(201).json({discussion: populateDiscussion})
    } catch (error) {
        return res.status(500).json({message: "Failed to add Discussion"})
    }
})

const getDiscussion = asyncHandler(async(req,res) => {
    try {
        const discussion = await Discussion.find().populate("user", "username");
        return res.status(201).json({discussion})
    } catch (error) {
        return res.status(500).json({message: "unable to get discussion"})
    }
});

const getUserDiscussion = asyncHandler(async(req, res) => {
   try {
    const userId = req.user._id;
    const userDiscussion = await Discussion.find({user : userId})
    return res.status(201).json({userDiscussion})
   } catch (error) {
    return res.status(500).json({message: "unable to get user discussion"})
   }
})

export {
    createDiscussion,
    getDiscussion,
    getUserDiscussion
}