"use client"

import { useState } from "react"
import { Search, Book, FileText, Video, Globe, Download } from "lucide-react"
import Header from "../Components/Navbar"
import Footer from "../Components/Footer"

const resourceCategories = [
  { name: "All", icon: Book },
  { name: "Textbooks", icon: Book },
  { name: "Notes", icon: FileText },
  { name: "Video Lectures", icon: Video },
  { name: "Practice Papers", icon: FileText },
  { name: "Educational Websites", icon: Globe },
]

const resources = [
  { id: 1, title: "NCERT Mathematics Textbook - Class 10", category: "Textbooks", downloads: 1500, link: "#" },
  { id: 2, title: "ICSE Physics Notes - Chapter 1: Force and Pressure", category: "Notes", downloads: 800, link: "#" },
  { id: 3, title: "CBSE Biology Video Lecture Series", category: "Video Lectures", downloads: 2000, link: "#" },
  { id: 4, title: "SSC English Grammar Practice Paper", category: "Practice Papers", downloads: 1200, link: "#" },
  { id: 5, title: "Khan Academy - Algebra Basics", category: "Educational Websites", downloads: 3000, link: "#" },
  { id: 6, title: "IGCSE Chemistry Revision Guide", category: "Notes", downloads: 950, link: "#" },
  { id: 7, title: "NCERT Science Textbook - Class 9", category: "Textbooks", downloads: 1800, link: "#" },
  { id: 8, title: "Indian History Timeline - Visual Guide", category: "Notes", downloads: 750, link: "#" },
  {
    id: 9,
    title: "Geometry Problem Solving Techniques - Video Series",
    category: "Video Lectures",
    downloads: 1100,
    link: "#",
  },
  {
    id: 10,
    title: "CBSE Previous Year Question Papers (All Subjects)",
    category: "Practice Papers",
    downloads: 5000,
    link: "#",
  },
  { id: 11, title: "Byjus Learning App", category: "Educational Websites", downloads: 10000, link: "#" },
  { id: 12, title: "Vedantu Live Classes", category: "Educational Websites", downloads: 8000, link: "#" },
]

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResources = resources.filter(
    (resource) =>
      (selectedCategory === "All" || resource.category === selectedCategory) &&
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
   <>
   <Header />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Resource Library</h1>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {resourceCategories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex items-center px-4 py-2 rounded-full ${
              selectedCategory === category.name
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            <category.icon size={18} className="mr-2" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
              <p className="text-gray-600 mb-4">Category: {resource.category}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 flex items-center">
                <Download size={16} className="mr-1" /> {resource.downloads} downloads
              </span>
              <a
                href={resource.link}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Access Resource
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No resources found. Try adjusting your search or category filter.
        </p>
      )}

      {/* Upload Resource CTA */}
      <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Have a resource to share?</h2>
        <p className="mb-6">Help your fellow students by uploading your study materials, notes, or practice papers.</p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Upload a Resource
        </button>
      </div>
    </div>
    <Footer />
   </>
  )
}

export default Resources

