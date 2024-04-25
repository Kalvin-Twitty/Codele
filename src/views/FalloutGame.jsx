import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  'SPIES', 'TRIES', 'PRICE', 'TRICK', 'THIRD', 
  'CHOICE', 'FIRST', 'BLAST', 'CRANE', 'BRAVE'
];
const correctPassword = words[Math.floor(Math.random() * words.length)];

const Terminal = () => {
  const [attempts, setAttempts] = useState(4);
  const [selectedWord, setSelectedWord] = useState('');
  const [message, setMessage] = useState('Select a word to begin.');
  const [lockout, setLockout] = useState(false);
  const [granted, setGranted] = useState(false);
  const [selfDestruct, setSelfDestruct] = useState(false);

  const handleWordSelection = (word) => {
    console.log(`Word selected: ${word}`); // For debugging
    if (lockout || granted) return;

    setSelectedWord(word);
    const likeness = word.split('').reduce((acc, char, idx) => {
      return acc + (correctPassword[idx] === char ? 1 : 0);
    }, 0);

    if (word === correctPassword) {
      setMessage('Access granted! Correct password: ' + word);
      setGranted(true);
      setTimeout(() => setLockout(true), 2000);
    } else {
      const remainingAttempts = attempts - 1;
      setAttempts(remainingAttempts);
      setMessage(
        remainingAttempts <= 0
          ? 'Self-Destruct initiated.'
          : `${word} is incorrect. ${likeness}/${word.length} correct.`
      );
      if (remainingAttempts <= 0) {
        setSelfDestruct(true);
        setTimeout(() => setLockout(true), 5000);
      }
    }
  };

  return (
    <AnimatePresence>
      {!lockout && (
        <motion.div 
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 p-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="w-full max-w-2xl p-8 bg-black bg-opacity-90 rounded-xl shadow-2xl border border-green-500 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <h1 className="text-4xl font-mono font-bold text-green-400 mb-8 text-center">RobCo Industries (TM) Termlink Protocol</h1>
            <p className="text-green-300 mb-2 font-mono text-lg">WARNING: LOCKOUT IMMINENT</p>
            <p className="text-green-300 mb-8 font-mono text-lg">Attempts Left: {attempts}</p>
            <div className="grid grid-cols-2 gap-4">
              {words.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordSelection(word)}
                  disabled={lockout}
                  className={`w-full text-left px-6 py-3 text-lg font-mono font-bold ${selectedWord === word ? 'bg-blue-800 text-white' : 'text-green-200 bg-gray-900 hover:bg-gray-800'} rounded-lg transition ease-in-out duration-150`}
                >
                  {word}
                </button>
              ))}
            </div>
            <motion.div 
              className="mt-8 p-6 text-center text-lg font-mono rounded-lg bg-gray-900"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {message}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {granted && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-green-400 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-4xl font-bold">Access Granted!</p>
        </motion.div>
      )}
      {selfDestruct && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-red-600 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <p className="text-4xl font-bold">Self-Destruct in 3... 2... 1...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
