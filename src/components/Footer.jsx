import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 p-4 text-center">
      <p>© {new Date().getFullYear()} Codele. All rights reserved.</p>
    </footer>
  );
};

export default Footer;