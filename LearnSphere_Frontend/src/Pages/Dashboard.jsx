import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"
import { BookOpen, Video, MessageSquare, Award } from "lucide-react"
import Header from "../Components/Navbar"
import Footer from "../Components/Footer"
import { useState , useEffect } from "react"
import {API, discussionAPI, notesAPI, videoAPI} from "../api/axiosInstance.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

const Dashboard = () => {
  // Mock data for the user
  // const user = {
  //   // name: "Pranay Kumar",
  //   // email: "pranay@example.com",
  //   // grade: "10th",
  //   // school: "Delhi Public School",
  //   // joinDate: "January 15, 2023",
  //   // name : username
  // }
    
    const [user,setUser] = useState(
      { username: "",
        email: "",
        standard: "",
        board: ""
      }
    );
    
    const[usernotes, setUserNotes] = useState([]);
    const[uservideos, setUserVideos] = useState([]);
    const[userDiscussion, setUserDiscussion] = useState([]);
      
     const fetchUser = async () => {
      try {
        const response = await API.get("/current-user");
        console.log(response.data)
        setUser(response.data.data)
      } catch (error) {
        console.log("user details not found", error);
      }
     };

     const fetchUserNotes = async () => {
      try {
        const notesResponse = await notesAPI.get("/get-currUser-note");
        console.log(notesResponse.data)
        setUserNotes(notesResponse.data.data)
      } catch (error) {
        console.log("notes not found", error)
      }
     };

     const fetchuserVideos = async () => {
      try {
        const videoResponse = await videoAPI.get("/get-currUser-videos");
        console.log(videoResponse.data)
        setUserVideos(videoResponse.data.data)
      } catch (error) {
        console.log("videos not found", error)
      }
     };

     const fetchUserDiscussion = async () => {
      try {
        const discussionResponse = await discussionAPI.get("/get-currUser-discussion")
        console.log(discussionResponse.data)
        setUserDiscussion(discussionResponse.data.userDiscussion)
      } catch (error) {
        console.log("discussions not found"); 
      }
     }

      useEffect(() => {
       fetchUser();
       fetchUserNotes();
       fetchuserVideos();
       fetchUserDiscussion()
       }, []);


       

  // Mock data for user statistics
  const stats = {
    notesUploaded: 15,
    videosUploaded: 5,
    discussionsParticipated: 30,
    pointsEarned: 500,
  }

  // Mock data for subject progress
  const subjectProgressData = {
    labels: ["Mathematics", "Science", "English", "Social Studies", "Hindi"],
    datasets: [
      {
        label: "Progress",
        data: [75, 68, 80, 62, 70],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Mock data for contribution breakdown
  const contributionData = {
    labels: ["Notes", "Videos", "Discussions"],
    datasets: [
      {
        data: [usernotes.length, uservideos.length, userDiscussion.length],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  }

  return (
    <>
      <Header />
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
        <div key= {user._id} className="bg-white p-6 rounded-lg shadow-md">
          
          
          <h2 className="text-xl font-semibold mb-4">{user.username || "Loading..."}</h2>
          <p className="text-gray-600 mb-2">Email: {user.email || "N/A"}</p>
          <p className="text-gray-600 mb-2">Grade: {user.standard || "N/A"}</p>
          <p className="text-gray-600 mb-2">Board: {user.board || "N/A"}</p>
          
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-500 mr-2" />
              <div>
                <p className="text-gray-600">Notes Uploaded</p>
                <p className="text-2xl font-bold">{usernotes.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Video className="w-8 h-8 text-green-500 mr-2" />
              <div>
                <p className="text-gray-600">Videos Uploaded</p>
                <p className="text-2xl font-bold">{uservideos.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-yellow-500 mr-2" />
              <div>
                <p className="text-gray-600">Discussions</p>
                <p className="text-2xl font-bold">{userDiscussion.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="w-8 h-8 text-purple-500 mr-2" />
              <div>
                <p className="text-gray-600">Points Earned</p>
                <p className="text-2xl font-bold">{stats.pointsEarned}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Subject Progress</h2>
          <Bar
            data={subjectProgressData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contribution Breakdown</h2>
          <Doughnut
            data={contributionData}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li className="text-gray-600">Uploaded Physics notes on "Newton's Laws of Motion"</li>
          <li className="text-gray-600">Participated in discussion: "Tips for memorizing historical dates"</li>
          <li className="text-gray-600">Watched video: "Understanding photosynthesis"</li>
          <li className="text-gray-600">Earned 50 points for helping a peer with a math problem</li>
          <li className="text-gray-600">Uploaded a video explaining "Solving Quadratic Equations"</li>
        </ul>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Dashboard

