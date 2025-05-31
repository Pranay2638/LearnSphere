import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Video, BookmarkPlus, Users, Bell } from "lucide-react"
import Header from "../Components/Navbar"
import Footer from "../Components/Footer"

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <>
       <Header />
      <div className="container mx-auto px-4 py-8">
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white rounded-3xl mb-12 relative overflow-hidden"
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-30"
        />
        <h1 className="text-5xl font-bold mb-6 relative z-10">Welcome to LearnSphere</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto relative z-10">
          Empowering Indian students to learn, share, and grow together. Join our collaborative platform for 9th and
          10th standard students across CBSE, ICSE, IGCSE, and SSC boards.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/signup"
            className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center relative z-10"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={BookOpen}
          title="Share Notes"
          description="Collaborate with peers by sharing and accessing study notes."
          link="/notes"
          index={0}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        />
        <FeatureCard
          icon={Video}
          title="Upload Videos"
          description="Share educational videos on various subjects and topics."
          link="/videos"
          index={1}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        />
        <FeatureCard
          icon={BookmarkPlus}
          title="Resource Library"
          description="Access and contribute to a collection of reference books and study materials."
          link="/resources"
          index={2}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        />
        <FeatureCard
          icon={Users}
          title="Interactive Discussions"
          description="Engage in discussions to improve communication skills and boost confidence."
          link="/discussions"
          index={3}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        />
        <FeatureCard
          icon={Bell}
          title="Educational Updates"
          description="Stay informed with the latest updates in the education sector."
          link="/updates"
          index={4}
          hoveredCard={hoveredCard}
          setHoveredCard={setHoveredCard}
        />
      </div>
    </div>
    <Footer />
    </>

  )
}

const FeatureCard = ({ icon: Icon, title, description, link, index, hoveredCard, setHoveredCard }) => {
  const isHovered = hoveredCard === index

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHoveredCard(index)}
      onHoverEnd={() => setHoveredCard(null)}
      className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.3 }}>
        <Icon className={`w-12 h-12 ${isHovered ? "text-indigo-600" : "text-blue-500"} mb-4`} />
      </motion.div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="text-indigo-600 hover:text-indigo-800 inline-flex items-center font-medium">
        Learn more <ArrowRight className="ml-1 w-4 h-4" />
      </Link>
    </motion.div>
    
  )
}


