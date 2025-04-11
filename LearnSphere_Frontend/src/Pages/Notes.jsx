import { useEffect, useState } from "react";
import Footer from "../Components/Footer.jsx";
import Header from "../Components/Navbar.jsx";
import NoteUpload from "../Components/NoteUpload.jsx";
import {notesAPI} from "../api/axiosInstance.js"; // Make sure the API instance is correctly imported


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const fetchNotes = async () => {
    try {
      const response = await notesAPI.get("/get-note");
      console.log("Full API Response:", response); // Check full response
      console.log("Notes Data:", response.data); // Check notes data
      
      if (response.data && Array.isArray(response.data)) {
        setNotes(response.data);
      } else {
        setNotes([]);
        console.warn("Notes data is not an array:", response.data);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      //setError("Failed to load notes. Please try again.");
      setError("Please Sign in to view notes!!!");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
   
    fetchNotes();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Study Notes</h1>
        <NoteUpload onUploadSuccess={fetchNotes}/>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Notes</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading notes...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : notes && notes.length === 0 ? (
            <p className="text-center text-gray-500">No notes available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(notes) && notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Description: {note.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Uploaded by: {note.uploadedBy.username}
                  </p>
                  <a
                    href={note.fileURL}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download File
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notes;

