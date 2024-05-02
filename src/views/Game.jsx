import React, { useState, useEffect } from 'react';
import { FaRegLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import words from '../words.json';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

function Game() {
  const [currentWordData, setCurrentWordData] = useState({});
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [hintsDisplayed, setHintsDisplayed] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinalFantasy7, setIsFinalFantasy7] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const navigate = useNavigate();
  const easterEggKeywords = ['pokemon', 'fallout', '777'];

  const [completedChallenges, setCompletedChallenges] = useLocalStorage('completedChallenges', []);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todaysWord = words.find((word) => word.date === today);
    if (todaysWord) {
      setCurrentWordData(todaysWord);
    } else {
      setMessage('No word for today. Come back tomorrow!');
    }
  }, []);

  useEffect(() => {
    if (completedChallenges.includes(currentWordData.word)) {
      setMessage('You have already completed this challenge!');
      setGuess('');
    }
  }, [currentWordData, completedChallenges]);

  const handleGuessSubmit = (event) => {
    event.preventDefault();
    if (completedChallenges.includes(currentWordData.word)) {
      setMessage('You have already completed this challenge!');
      return;
    }
    if (attempts >= 4) {
      setMessage('No more attempts! Try again tomorrow.');
      setCompletedChallenges([...completedChallenges, currentWordData.word]);
      setGuess('');
      setIsGameOver(true);
      return;
    }
    if (easterEggKeywords.includes(guess.toLowerCase())) {
      if (guess.toLowerCase() === 'pokemon') {
        navigate('/pokemon-game');
      } else if (guess.toLowerCase() === 'fallout') {
        navigate('/fallout-game');
      } else if (guess.toLowerCase() === '777') {
        setIsFinalFantasy7(true); 
        setMessage('Lucky 7s activated!');
      }
      return;
    }
    if (guess.toLowerCase() === currentWordData.word.toLowerCase()) {
      setMessage('Correct! Here is the definition:');
      setIsModalOpen(true);
      setCompletedChallenges([...completedChallenges, currentWordData.word]);
      setIsConfettiActive(true);
    } else {
      setMessage('Try again!');
      const newHintsDisplayed = [...hintsDisplayed];
      if (attempts < 3) {
        newHintsDisplayed.push(currentWordData.hints[attempts]);
      } else {
        setIsModalOpen(true);
      }
      setHintsDisplayed(newHintsDisplayed);
      setAttempts(attempts + 1);
    }
    setGuess('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsConfettiActive(false);
    setIsFinalFantasy7(false); 
  };

  return (
    <motion.div 
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 p-4 text-gray-300 ${isFinalFantasy7 ? 'final-fantasy-7' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-lg">
        <motion.h1 
          className="text-4xl font-bold text-center mb-6"
          initial={{ y: -250 }}
          animate={{ y: -10 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          {isFinalFantasy7 ? (
            <span>
              {Array.from('Lucky 7s from Final Fantasy 7').map((letter, index) => (
                <motion.span 
                  key={index}
                  style={{ animation: `rainbow 1.2s linear infinite ${index * 0.2}s` }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ) : (
            'Guess the Development Word'
          )}
        </motion.h1>
        <form onSubmit={handleGuessSubmit} className="flex flex-col items-center">
          <motion.input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess here..."
            className="input input-bordered input-accent w-full mb-4 text-black placeholder-gray-500 bg-gray-100 rounded-lg shadow-md transition duration-150 ease-in-out p-4 "
            whileFocus={{ scale: 1.02 }}
          />
          <motion.div className="w-full flex justify-center">
            <motion.button 
              type="submit" 
              className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg w-48"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Guess
            </motion.button>
          </motion.div>
        </form>
        <motion.div className="mt-4 space-y-2">
          {hintsDisplayed.map((hint, index) => (
            <motion.div 
              key={index}
              className="flex items-center p-4 bg-slate-800 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <FaRegLightbulb className="text-green-400 w-6 h-6 mr-2" />
              <span>{hint}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.p 
          className="mt-4 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      </div>
      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-slate-800 rounded-lg shadow-xl p-6 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-semibold mb-4">Definition</h3>
            <p className="mb-2">{currentWordData.definition}</p>
            <h4 className="text-lg font-semibold mb-2">Word:</h4>
            <p className="mb-4">{currentWordData.word}</p>
            <motion.button 
              onClick={closeModal} 
              className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
      {isConfettiActive && <Confetti />}
      {isGameOver && (
        <motion.div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-slate-800 rounded-lg shadow-xl p-6 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Game Over!</h3>
            <p className="mb-4">Better luck next time!</p>
            <motion.button 
              onClick={closeModal} 
              className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Game;
