import React, { useState } from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaTimes, FaCheck } from 'react-icons/fa';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig'; 
import { motion } from 'framer-motion'; 

const Footer = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    setSuccess(false); // Reset success state when form is toggled
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add feedback to Firestore collection
      await addDoc(collection(firestore, 'feedback'), {
        email,
        message,
        timestamp: serverTimestamp(),
      });
      setSuccess(true);
      setEmail(''); 
      setMessage(''); 
      setTimeout(() => {
        toggleForm(); 
      }, 3000);
    } catch (error) {
      console.error('Error adding feedback: ', error);
    }
  };

  return (
    <footer className="bg-slate-800 text-gray-300 p-6 text-center relative">
      <div className="flex justify-center items-center mb-4">
        <a href="#" className="mr-4 text-gray-400 hover:text-gray-200">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="mr-4 text-gray-400 hover:text-gray-200">
          <FaGithub size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-200">
          <FaLinkedin size={24} />
        </a>
      </div>
      <p className="mb-4">Connect with us on social media!</p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={toggleForm}
      >
        {showForm ? 'Close Form' : 'Contact Me'}
      </button>
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-gray-900 rounded-lg p-8 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 focus:outline-none"
              onClick={toggleForm}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Contact Me</h2>
            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.5 }}
                className="text-green-500 flex justify-center items-center mb-4"
              >
                <FaCheck size={24} className="mr-2" />
                Feedback submitted successfully!
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="Enter your message"
                  rows={4}
                  className="w-full bg-gray-800 text-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </motion.div>
      )}
      <p className="mt-4">© {new Date().getFullYear()} Codele. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
