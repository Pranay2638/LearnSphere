import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {createDiscussion, getDiscussion, getUserDiscussion} from '../controllers/discussion.controller.js'

const discussionRouter = express.Router();

discussionRouter.post("/create-discussion", authMiddleware, createDiscussion)

discussionRouter.get("/get-discussion", authMiddleware, getDiscussion)

discussionRouter.get("/get-currUser-discussion", authMiddleware, getUserDiscussion)

export default discussionRouter