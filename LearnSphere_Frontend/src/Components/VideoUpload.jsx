import { useState } from "react"
import { videoAPI } from "../api/axiosInstance"

const VideoUpload = () => {
  const [file, setFile] = useState({})
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadComplete(false)
      setError("")
    }
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !title || !description) return;

    setUploading(true)
    setError("")

    const formData = new FormData();
    formData.append("videoURL", file)
    formData.append("title", title)
    formData.append("description", description)
    
    try {
      const response = await videoAPI.post("/upload-video", formData, {
        headers: {"Content-Type": "multipart/form-data"},
      })
      console.log("Upload successfull", response.data)
      setUploading(false)
      setUploadComplete(true)
      setTitle("")
      setDescription("")
      setFile("")

    } catch (error) {
      console.log("failed to upload video", error.response?.data)
      setUploading(false)
    }

  }

  
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-md mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Upload Educational Video</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {uploadComplete && <p className="text-green-500 text-center">Video uploaded successfully!</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Enter Video Title"
          className="w-full p-3 border rounded-lg focus:outline-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter Video Description"
          className="w-full p-3 border rounded-lg focus:outline-indigo-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="video-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-indigo-700">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-indigo-500">MP4, WebM or OGG (MAX. 100MB)</p>
            </div>
            <input id="video-upload" type="file" className="hidden" onChange={handleFileChange} accept="video/*" />
          </label>
        </div>

        {file && (
          <div className="flex items-center justify-between bg-indigo-100 p-3 rounded-lg">
            <span className="text-sm text-indigo-700 font-medium">{file.name}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-colors ${
            file ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}
export default VideoUpload

