// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Navbar = ({ isAuthenticated }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-gray-700 text-white shadow-md fixed w-full top-0 z-10">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <Link to="/" className="text-white">
//             <span>Learn</span>
//             <span className="text-yellow-300">Sphere</span>
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6">
//           <Link to="/" className="hover:text-gray-200">Home</Link>
//           <Link to="/courses" className="hover:text-gray-200">Courses</Link>
//           <Link to="/about" className="hover:text-gray-200">About</Link>
//           <Link to="/contact" className="hover:text-gray-200">Contact</Link>

//           {/* Authentication Links or Profile */}
//           {isAuthenticated ? (
//             <>
//               <Link to="/profile" className="hover:text-gray-200">Profile</Link>
//               <Link to="/logout" className="hover:text-gray-200">Logout</Link>
//             </>
//           ) : (
//             <>
//               <Link to="/signup" className="hover:text-gray-200">Sign Up</Link>
//               <Link to="/login" className="hover:text-gray-200">Login</Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Hamburger Menu */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-white focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu (Conditional rendering based on menu state) */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-blue-600 p-4 space-y-4">
//           <Link to="/" className="text-white block">Home</Link>
//           <Link to="/courses" className="text-white block">Courses</Link>
//           <Link to="/about" className="text-white block">About</Link>
//           <Link to="/contact" className="text-white block">Contact</Link>

//           {/* Authentication Links or Profile */}
//           {isAuthenticated ? (
//             <>
//               <Link to="/profile" className="text-white block">Profile</Link>
//               <Link to="/logout" className="text-white block">Logout</Link>
//             </>
//           ) : (
//             <>
//               <Link to="/signup" className="text-white block">Sign Up</Link>
//               <Link to="/login" className="text-white block">Login</Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold">
//           <Link to="/">LearnSphere</Link>
//         </h1>
//         <div className="flex gap-4">
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/profile" className="hover:underline">Profile</Link>
//           <Link to="/notes" className="hover:underline">Notes</Link>
//           <Link to="/videos" className="hover:underline">Videos</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

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



