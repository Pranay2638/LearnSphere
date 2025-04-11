import { useEffect, useState } from "react"
import Footer from "../Components/Footer.jsx"
import Header from "../Components/Navbar.jsx"
import VideoUpload from "../Components/VideoUpload.jsx"
import { videoAPI } from "../api/axiosInstance.js"

const Videos = () => {
   
  const [videos, setVideos] = useState([])

  const fetchVideos = async () => {
    try {
      const response = await videoAPI.get("/get-videos")
      console.log("videos Fetched successfully", response)
      setVideos(response.data)
    } catch (error) {
      console.log("error fetching notes", error)
    }
  }

  useEffect(() => {
    fetchVideos()
  } , []) 

  


  return (
<>
<Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Educational Videos</h1>
        <VideoUpload />
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Uploaded Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(videos) && videos.length > 0 ? (
              videos.map((video) =>  ( 
                <div key={video._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <video className="w-full h-48" controls>
                    <source src={video.videoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Please Sign in to continue watching...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
</>
  )
}

export default Videos

