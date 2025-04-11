import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">LearnSphere</h3>
            <p className="text-sm">Empowering Indian students to learn, share, and grow together.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/notes" className="hover:text-yellow-400">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-yellow-400">
                  Videos
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-yellow-400">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/discussions" className="hover:text-yellow-400">
                  Discussions
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Email: info@LearnSphere.com</p>
            <p className="text-sm">Phone: +91 1234567890</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400">
                < Facebook size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400">
              < Twitter size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400">
              < Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 LearnSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

