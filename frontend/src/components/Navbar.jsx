import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <div className="sticky top-0 shadow-md z-50 bg-white">
        <nav className="px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Toolpresso
          </Link>

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/tools" className="hover:text-blue-600">
              Tools
            </Link>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="text-xl text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col px-6 space-y-4 text-gray-700 font-medium">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/tools"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600"
          >
            Tools
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
