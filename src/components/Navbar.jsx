import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-slate-800 p-6">
        {/* Make the "Codele" text clickable */}
        <Link to="/" className="font-semibold text-xl tracking-tight text-green-400">Codele</Link>
        <FaBars
          className="text-green-400 cursor-pointer"
          size={24}
          onClick={() => setIsMenuOpen(true)}
        />
      </nav>

      <motion.aside
        className="fixed inset-y-0 right-0 z-50 w-64 overflow-y-auto bg-slate-700 shadow-lg text-white"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={variants}
        transition={{ damping: 10, type: "spring" }}
      >

        <div className="p-5">
          <Link to="/" className="block py-2 text-green-400" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/game" className="block py-2 text-green-400" onClick={() => setIsMenuOpen(false)}>Game</Link>
          <Link to="/leaderboard" className="block py-2 text-green-400" onClick={() => setIsMenuOpen(false)}>Leaderboard</Link>
          <Link to="/about" className="block py-2 text-green-400" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/stack" className="block py-2 text-green-400" onClick={() => setIsMenuOpen(false)}>Stack</Link>
          {/* Add additional links as needed */}
          <button
            className="mt-4 p-2 w-full bg-green-500 rounded hover:bg-green-400 text-slate-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Close Menu
          </button>
        </div>
      </motion.aside>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
};

export default Navbar;
