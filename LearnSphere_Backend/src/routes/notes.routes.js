import express from 'express'
import authMiddleware from "../middlewares/authMiddleware.js";
import {createNote, getNote, updateNote, deleteNote, getUserNote} from '../controllers/notes.controller.js'
import { upload } from '../middlewares/multer.js';

const noteRouter = express.Router()

noteRouter.post('/create-note', upload.single("fileURL"), authMiddleware, createNote)

noteRouter.get("/get-note", authMiddleware, getNote)

noteRouter.get("/get-currUser-note", authMiddleware, getUserNote)

noteRouter.put("/:id", authMiddleware, updateNote)

noteRouter.delete("/:id", authMiddleware, deleteNote)

export default noteRouter; 