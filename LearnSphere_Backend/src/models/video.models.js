import mongoose from 'mongoose' ;

const videoSchema = new mongoose.Schema({
   title: {
     type: String,
     require: true
   },
   description: {
     type: String
   },
   videoURL:{
     type: String,
     require: true
   },
   uploadedBy: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     require: true
   },
     uploadedAt: {
     type: Date,
     default: Date.now
   }, 
}, {timestamps: true})

export const Video = mongoose.model("Video", videoSchema)