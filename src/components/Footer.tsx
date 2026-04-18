import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-24 py-8 md:py-10 flex flex-col md:flex-row justify-between items-center bg-black">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 border-t border-white/10 pt-6 md:pt-10">
        <p className="text-gray-500 text-xs md:text-sm font-medium">
          © 2024 AYOUB AMEUR
        </p>
        <div className="flex gap-6 md:gap-8 text-center md:text-left">
          <a className="text-gray-500 text-xs md:text-sm hover:text-white transition-colors\">Github</a>
          <a className="text-gray-500 text-xs md:text-sm hover:text-white transition-colors\">LinkedIn</a>
          <a className="text-gray-500 text-xs md:text-sm hover:text-white transition-colors\">Twitter</a>
          <a className="text-gray-500 text-xs md:text-sm hover:text-white transition-colors\">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
