import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function PokemonGame() {
  const [pokemonData, setPokemonData] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);

  useEffect(() => {
    // Fetch a random Pokémon
    const pokemonId = Math.floor(Math.random() * 151) + 1; // 1st gen Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        setPokemonData({
          name: data.name,
          image: data.sprites.front_default
        });
      })
      .catch(error => console.error('Error fetching Pokémon data:', error));
  }, []);

  const handleGuess = () => {
    if (guess.toLowerCase() === pokemonData.name) {
      setMessage('Correct!');
      setIsGuessCorrect(true);
    } else {
      setMessage('Try again!');
      setIsGuessCorrect(false);
    }
    setGuess('');
  };

  if (!pokemonData) return <div>Loading...</div>;

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 p-4 text-gray-300"
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
          Who's that Pokémon?
        </motion.h1>
        <div className="relative">
          <motion.img 
            src={pokemonData.image} 
            alt="A silhouette of a Pokémon" 
            className="pokemon-silhouette w-72 h-72 mx-auto mb-6"
            style={{ filter: isGuessCorrect ? 'none' : 'brightness(0) invert(1)' }} // Apply filter conditionally
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
          <div className="absolute inset-0 "></div>
        </div>
        <motion.input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter Pokémon name"
          className="input input-bordered input-accent w-full mb-4 text-black placeholder-gray-500 bg-gray-100 rounded-lg shadow-md transition duration-150 ease-in-out p-4"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button 
          onClick={handleGuess} 
          className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Guess
        </motion.button>
        <motion.p 
          className="mt-4 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default PokemonGame;
