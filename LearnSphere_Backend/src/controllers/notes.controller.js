import asyncHandler from 'express-async-handler'
import { Notes } from '../models/notes.models.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

// const createNote = asyncHandler(async(req,res) => {
//     console.log('Request Body:', req.body); // Logs text fields
//   console.log('Uploaded File:', req.file); // Logs uploaded file details
//     const {title, description} = req.body;

//     if(!title || !req.file){
//         throw new ApiError(400, "Title and FileURL are Required")
//     }

//     try {
//         const fileURL = `/uploads/${req.file.filename}`;
//         const note = await Notes.create({
//             title,
//             description,
//             fileURL,
//             uploadedBy: req.user._id,
//         })
//          res
//         .status(201)
//         .json(({
//             success: true,
//             message: "Notes uploaded successfully",
//             data: note
//         }))

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//           });
//     }

// })

const createNote = asyncHandler(async (req, res) => {
    const { title, description } = req.body; // Only destructure what's actually sent in req.body

    // Validate the required fields
    if (!title || !req.file) {
        throw new ApiError(400, "Title and File are Required");
    }

    try {
        // Use req.file to construct fileURL
        //const fileURL = `/uploads/${req.file.filename}`;
        const fileURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;


        // Create the note in the database
        const note = await Notes.create({
            title,
            description,
            fileURL, // Save the constructed file URL
            uploadedBy: req.user._id, // Assuming req.user is populated
        });

        res.status(201).json({
            success: true,
            message: "Notes uploaded successfully",
            data: note,
        });
    } catch (error) {
        console.error("Error in createNote:", error); // Log error details for debugging
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});


const getNote = asyncHandler(async(req,res) => {
    try {
        const notes = await Notes.find({}).populate("uploadedBy", "username")
        res.status(200).json( notes)
    } catch (error) {
        throw new ApiError(500, error.message)        
    }
})

const getUserNote = asyncHandler(async(req,res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated request
        const userNotes = await Notes.find({ uploadedBy: userId }); // Fetch only user-specific notes
    
        return res.status(200).json({
          success: true,
          message: "User notes fetched successfully",
          data: userNotes, // Return only notes by the logged-in user
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error fetching user notes",
          error: error.message,
        });
      }
})

const updateNote = asyncHandler(async(req,res) => {
    const {id} = req.params;
    console.log("Note ID from request:", req.params);
    const {title, description, fileURL} = req.body;

    try {
        const note = await Notes.findById(id)
        if(!note){
            throw new ApiError(404, "Notes not Found")
        }
        if(note.uploadedBy.toString() !== req.user._id.toString()){
            throw new ApiError(403, "You Are not Authorized to update")
        }
        note.title = title || note.title;
        note.description = description || note.description;
        note.fileURL = fileURL || note.fileURL;

        const updatedNote = await note.save();
        return res. status(200).json({
            success: true,
            message: "Notes updated successfully",
            data: updatedNote
        })           //new ApiResponse("Notes updated successfully", updatedNote)
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const deleteNote = asyncHandler(async(req,res) => {
    const {id} = req.params
    console.log("Note ID from request:", req.params);
    try {
        const note = await Notes.findById(id)

        if(!note){
            throw new ApiError(401,"Note not found")
        }

        if(note.uploadedBy.toString() !== req.user._id.toString()){
            throw new ApiError(401, "not Authorized")
        }
        await Notes.findByIdAndDelete(id);
        return res.status(201).json(new ApiResponse(200, "note deleted successfully"))

    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

export {
    createNote,
    getNote,
    getUserNote,
    updateNote,
    deleteNote
}