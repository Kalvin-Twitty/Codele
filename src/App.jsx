import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import About from './views/About';
import Game from './views/Game';
import Leaderboard from './views/Leaderboard';
import Stack from './views/Stack';
import PokemonGame from './views/PokemonGame';
import FalloutGame from './views/FalloutGame'; // Import the new Fallout game component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="/pokemon-game" element={<PokemonGame />} />
        <Route path="/fallout-game" element={<FalloutGame />} /> {/* Add route for the Fallout game */}
      </Routes>
    </Router>
  );
}

export default App;
