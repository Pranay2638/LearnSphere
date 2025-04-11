import { useState } from "react";
import { discussionAPI } from "../api/axiosInstance";

const DiscussionUpload = () => {
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")

    const handleCreateDiscussion = async (e) => {
       e.preventDefault();
       if(!title || !message) return;

       try {
        const response = await discussionAPI.post("/create-discussion", {title, message})
        console.log("Upload successfull", response.data)
        setTitle("")
        setMessage("")
       } catch (error) {
         console.log("error creating discussion!", error)
       }
    }

    return (
      <>
        <form onSubmit={handleCreateDiscussion} className="space-y-4">
            <input 
              type="text" 
              placeholder="Discussion Title" 
              className="w-full p-2 border rounded" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="What would you like to discuss?"
                className="w-full p-2 border rounded h-32"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Post Discussion
            </button>
        </form>
     </>
    )
}

export default DiscussionUpload