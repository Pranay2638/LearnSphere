

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { API } from "../api/axiosInstance"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/logout"); // Call Logout API (Adjust URL if needed)
      localStorage.removeItem("authToken"); // Remove token from local storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-gray-100">Learn</span>
            <span className="text-yellow-400">Sphere</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/notes">Notes</NavLink>
            <NavLink to="/videos">Videos</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/discussions">Discussions</NavLink>
            <NavLink to="/updates">Updates</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition duration-300 cursor-pointer hover:border-white border-transparent border rounded-md"
            >
             Logout
            </button>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/10 rounded-full">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 py-4">
          <nav className="flex flex-col space-y-4 px-4">
            <NavLink to="/notes">Notes</NavLink>
            <NavLink to="/videos">Videos</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/discussions">Discussions</NavLink>
            <NavLink to="/updates">Updates</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition duration-300 cursor-pointer hover:border-white border-transparent border rounded-md"
            >
             Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

const NavLink = ({ to, children }) => (
  <Link to={to} className="hover:text-yellow-200 transition-colors">
    {children}
  </Link>
)

export default Header



