import React, { useState, useEffect } from 'react';
import { getFirestore, query, collection, getDocs, orderBy } from 'firebase/firestore';
import { FaCode, FaTrophy, FaUsers } from 'react-icons/fa';
import Footer from '../components/Footer';
import { firestore } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

function Home() {
  const [patchnotes, setPatchnotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPatchnotes = async () => {
    const q = query(collection(firestore, "commits"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const patchnotesData = querySnapshot.docs.map(doc => doc.data());
    setPatchnotes(patchnotesData);
  };

  useEffect(() => {
    fetchPatchnotes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="hero min-h-screen flex items-center justify-center">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-5">Welcome to <span className="text-green-500">Codele</span></h1>
              <p className="mb-5">Challenge your software development knowledge in a fun and interactive way!</p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn bg-green-500 text-white active:bg-green-600 font-bold px-6 py-3 rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
                >
                  View Patch Notes
                </button>
                <Link to="/game" className="btn bg-green-500 text-white active:bg-green-600 font-bold px-6 py-3 rounded shadow hover:shadow-lg transition duration-150 ease-in-out">
                  Start Playing
                </Link>
              </div>
            </div>
            <div className="mockup-code w-full lg:max-w-lg rounded overflow-hidden shadow-2xl bg-slate-800 p-6">
              <div className="flex justify-center mb-4">
                <FaCode className="text-green-500 w-16 h-16"/>
              </div>
              <div className="text-lg">
                <p>/* Guess the term */</p>
                <p>function guessTerm() {"{"}</p>
                <p className="ml-4">return 'Enjoy learning';</p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="features py-12 md:py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Why play <span className="text-green-500">Codele</span>?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-item flex flex-col items-center">
              <FaCode className="text-green-500 w-12 h-12 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Improve Your Skills</h3>
              <p>Engage with different programming concepts and refine your problem-solving skills.</p>
            </div>
            <div className="feature-item flex flex-col items-center">
              <FaTrophy className="text-green-500 w-12 h-12 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Leaderboards</h3>
              <p>Compete with others and track your ranking as you advance through daily challenges.</p>
            </div>
            <div className="feature-item flex flex-col items-center">
              <FaUsers className="text-green-500 w-12 h-12 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
              <p>Connect with like-minded individuals and be part of a growing developer community.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
  
      {/* Patchnotes Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-800 rounded-xl p-8 max-w-2xl mx-auto relative z-10 shadow-lg overflow-auto" style={{ maxHeight: '85vh', scrollbarWidth: 'none' }}>
              <h2 className="text-4xl font-bold mb-6 text-center text-green-500">Patch Notes</h2>
              <div className="space-y-4">
                {patchnotes.map((note, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg shadow">
                    <p className="text-sm text-gray-400 mb-1">{note.timestamp}</p>
                    <p className="text-lg text-green-500 mb-1 font-semibold">{note.author}</p>
                    <p className="text-gray-300 leading-relaxed">{note.message}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn bg-red-500 hover:bg-red-700 text-white font-bold mt-8 w-full py-3 rounded shadow hover:shadow-lg transition duration-150 ease-in-out"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;