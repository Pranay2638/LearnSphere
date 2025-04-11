import { useEffect, useState } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Navbar"
import { discussionAPI } from "../api/axiosInstance"
import DiscussionUpload from "../Components/discussionupload"

const Discussions = () => {

    const [discussion, setDiscussion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getDiscussion = async () => {
      try {
        const response = await discussionAPI.get("/get-discussion");
        console.log("discussion fetched successfully", response)
        if (response.data && Array.isArray(response.data.discussion)) {
          setDiscussion(response.data.discussion);
        } else {
          console.error("Unexpected API response format:", response.data);
          setDiscussion([]); // Ensure state is always an array
        }
      } catch (error) {
        console.log("error fetching files!", error)
        //setError("failed to load the discussion")
        setError("sign in to be part of the discussion")
      } finally {
        setLoading(false)
      }
    };

    useEffect(() => {
      getDiscussion();
    }, [])
    return (
      <>
        < Header />
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Interactive Discussions</h1>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Start a New Discussion</h2>
            <DiscussionUpload />
          </div>
          <div className="max-w-3xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading discussions...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : Array.isArray(discussion) && discussion.length === 0 ? (
            <p className="text-center text-gray-500">No discussions yet.</p>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Recent Discussions</h2>
              {discussion.map((discussion) => (
                <div key={discussion._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Started by: {discussion.user.username}</p>
                  <p className="text-gray-700">{discussion.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
      < Footer />
      </>
    )
  }
  
  export default Discussions
  
  