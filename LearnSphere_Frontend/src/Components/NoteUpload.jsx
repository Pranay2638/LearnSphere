import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, CheckCircle } from "lucide-react";
import {notesAPI} from "../api/axiosInstance.js"

const NoteUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState({});
  const [title, setTitle] = useState(""); // Title input state
  const [description, setDescription] = useState(""); // Description input state
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadComplete(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) return; // Ensure all fields are filled

    setUploading(true);

    const formData = new FormData();
    formData.append("fileURL", file);
    formData.append("title", title);
    formData.append("description", description);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Log key-value pairs
    }
    console.log(notesAPI);

    try {
      const response = await notesAPI.post("/create-note", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload successful:", response.data);
      if (response.data.success) {
        setUploading(false);
        setUploadComplete(true);
        setFile("");
        setTitle("");
        setDescription("");
  
        // Trigger a refresh of recent notes
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-xl p-8 max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Upload Study Notes</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="note-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-xl cursor-pointer bg-green-50 hover:bg-green-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-green-500" />
              <p className="mb-2 text-sm text-green-700">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-green-500">PDF, JPEG, or JPG (MAX. 10MB)</p>
            </div>
            <input
              id="note-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.jpeg,.jpg"
            />
          </label>
        </div>

        {file && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-green-100 p-3 rounded-lg"
          >
            <span className="text-sm text-green-700 font-medium">{file.name}</span>
            <button type="button" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!file || !title || !description || uploading}
          className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-colors ${
            file && title && description && !uploading
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Notes"}
        </motion.button>
      </form>
      {uploadComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-green-600 flex items-center justify-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>Upload complete!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NoteUpload;
