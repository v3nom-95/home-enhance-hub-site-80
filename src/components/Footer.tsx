
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© {currentYear} IT Department. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
