import mongoose from "mongoose"

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    fileURL: {
      type: String,
      required: true,  
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
} ,{timestamps: true})

export const Notes = mongoose.model("Notes", notesSchema)