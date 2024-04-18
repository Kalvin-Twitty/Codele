import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function PokemonGame() {
  const [pokemonData, setPokemonData] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);

  useEffect(() => {
    // Get the current date
    const today = new Date();
  
    // Get the day of the year (1-366)
    const dayOfYear = today.getDate() + today.getMonth() * 31;

    // Use the day of the year to generate a consistent random Pokémon ID
    const pokemonId = (dayOfYear % 151) + 1; // 1st gen Pokémon

    // Fetch the Pokémon data based on the generated ID
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
      // Record the completed game in local storage
      const completedGames = JSON.parse(localStorage.getItem('completedGames')) || [];
      localStorage.setItem('completedGames', JSON.stringify([...completedGames, pokemonData.name]));
    } else {
      setMessage('Try again!');
      setIsGuessCorrect(false);
    }
    setGuess('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleGuess();
    }
  };

  if (!pokemonData) return <div>Loading...</div>;

  // Check if the game has already been completed
  const gameCompleted = JSON.parse(localStorage.getItem('completedGames') || '[]').includes(pokemonData.name);

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
        {!gameCompleted && (
          <>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter Pokémon name"
              className="input input-bordered input-accent w-full mb-4 text-black placeholder-gray-500 bg-gray-100 rounded-lg shadow-md transition duration-150 ease-in-out p-4"
              onKeyDown={handleKeyPress}
              autoFocus
            />
            <button 
              onClick={handleGuess} 
              className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg w-full"
            >
              Guess
            </button>
          </>
        )}
        {gameCompleted && (
          <p className="mt-4 text-center">You have already completed this game!</p>
        )}
        <p 
          className="mt-4 text-center"
        >
          {message}
        </p>
      </div>
    </motion.div>
  );
}

export default PokemonGame;
