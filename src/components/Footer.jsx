import React, { useState } from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaTimes } from 'react-icons/fa';

const Footer = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 focus:outline-none"
              onClick={toggleForm}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Contact Me</h2>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 w-full"
              />
              <textarea
                placeholder="Enter your message"
                rows={4}
                className="w-full bg-gray-800 text-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
      <p className="mt-4">© {new Date().getFullYear()} Codele. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
