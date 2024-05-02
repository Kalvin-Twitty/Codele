import React from 'react';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { SiReact, SiTailwindcss, SiFirebase, SiFramer } from 'react-icons/si'; // Import technology icons from 'react-icons'

function Stack() {
  // Define the tech stack information
  const techStack = [
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces.',
      Icon: SiReact,
      color: 'text-blue-500',
      link: 'https://reactjs.org/',
    },
    {
      name: 'TailwindCSS',
      description: 'A utility-first CSS framework for rapid UI development.',
      Icon: SiTailwindcss,
      color: 'text-green-500',
      link: 'https://tailwindcss.com/',
    },
    {
      name: 'Firebase',
      description: 'A platform developed by Google for creating mobile and web applications.',
      Icon: SiFirebase,
      color: 'text-yellow-500',
      link: 'https://firebase.google.com/docs/', 
    },
    {
      name: 'Framer Motion',
      description: 'A library to power animations in React.',
      Icon: SiFramer,
      color: 'text-purple-500',
      link: 'https://www.framer.com/motion/', 
    },
  ];

  // Function to handle button click and navigate to external site
  const handleButtonClick = (link) => {
    window.open(link, '_blank'); // Open link in new tab
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-700 text-white"
    >
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold text-center mb-6"
        >
          Technology Stack
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800 p-6 rounded-lg shadow-xl flex items-center space-x-4 hover:bg-slate-700 transition duration-200 cursor-pointer" // Add cursor-pointer for hover effect
              onClick={() => handleButtonClick(tech.link)}
            >
              <tech.Icon size="3em" className={`${tech.color}`} />
              <div>
                <h3 className="text-2xl font-semibold">{tech.name}</h3>
                <p className="text-sm">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}

export default Stack;
