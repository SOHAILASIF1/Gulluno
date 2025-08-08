import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import productCategory from '../helper/productCategory'; // ← Make sure path is correct

function Links() {
  const [newBornOpen, setNewBornOpen] = useState(false);
  const [teenOpen, setTeenOpen] = useState(false);
  const [boysOpen, setBoysOpen] = useState(false);
  const [girlOpen, setGirlOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleDropdown = (setFn, current) => {
    setFn(!current);
  };

  const renderDropdown = (title, isOpen, setOpen, categoryKey) => (
    <li className="relative list-none font-bold text-white text-base md:text-lg">
      <button
        onClick={() => toggleDropdown(setOpen, isOpen)}
        className="flex items-center gap-1 focus:outline-none"
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="bg-gray-800 rounded shadow-md mt-2 md:absolute md:top-full md:left-0 z-10 min-w-[150px]">
          {productCategory[categoryKey]?.map((item) => (
            <li key={item.id} className="px-4 py-2 hover:bg-gray-700">
              <Link
                to={`/category-product/${item.value}`}
                onClick={() => {
                  setOpen(false);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <div className={`w-full px-4 md:px-16 py-2 bg-black z-50 ${isHomePage ? 'sticky top-13' : ''}`}>
      {/* Hamburger for mobile */}
      <div className="flex justify-between items-center md:hidden">
        <h1 className="text-white text-xl font-bold">Menu</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <ul
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row md:items-center md:justify-start gap-4 md:gap-8 mt-4 md:mt-0 transition-all duration-300`}
      >
        <li className="list-none font-bold text-white text-base md:text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>

        {renderDropdown('Boys', boysOpen, setBoysOpen, 'boys')}
        {renderDropdown('Girls', girlOpen, setGirlOpen, 'girls')}
        {renderDropdown('New Born', newBornOpen, setNewBornOpen, 'newborn')}
        {renderDropdown('Teen', teenOpen, setTeenOpen, 'teen')}

        <li className="list-none font-bold text-white text-base md:text-lg">
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li className="list-none font-bold text-white text-base md:text-lg">
          <Link to="/contactUs" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}

export default Links;
