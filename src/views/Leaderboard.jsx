import React from 'react';
import { motion } from 'framer-motion';
import leaderboardData from '../leaderboard.json';
import { FaMedal } from 'react-icons/fa';

const medalColors = {
  0: "text-gold-500", // Gold color for 1st place
  1: "text-silver-400", // Silver color for 2nd place
  2: "text-bronze-500", // Bronze color for 3rd place
};

function Leaderboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-white p-4 sm:p-8 flex flex-col items-center justify-center"
    >
      <motion.h1 
        initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center"
      >
        Leaderboard
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.4 } },
        }}
        className="w-full max-w-4xl"
      >
        {leaderboardData.map((user, index) => (
          <motion.div 
            key={user.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center justify-between p-3 sm:p-5 mb-3 sm:mb-4 rounded-xl shadow-xl text-sm sm:text-lg ${index < 3 ? 'bg-gray-700' : 'bg-gray-800'}`}
          >
            <div className="flex items-center">
              <FaMedal className={`${medalColors[index] || 'text-gray-400'} w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2`} />
              <span>{user.username}</span>
            </div>
            <motion.div 
              className="rounded-full bg-green-500 px-3 sm:px-4 py-1 text-xs sm:text-sm"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {user.streak} day{user.streak === 1 ? '' : 's'}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Leaderboard;
