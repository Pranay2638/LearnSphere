import express from 'express'
import { createVideo, deleteVideo, getUserVideo, getVideo } from '../controllers/video.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/multer.js';


const videoRouter = express.Router(); 

videoRouter.post("/upload-video", upload.single("videoURL") ,authMiddleware ,createVideo)

videoRouter.get("/get-videos", authMiddleware ,getVideo)

videoRouter.get("/get-currUser-videos", authMiddleware ,getUserVideo)

videoRouter.delete("/:id", authMiddleware ,deleteVideo)

export default videoRouter