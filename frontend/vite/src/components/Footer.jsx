import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* company info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Nike Shoes</h2>
          <p>
            Discover the latest collection of Nike shoes, blending style and
            performance to keep you ahead in the game.
          </p>
        </div>
        {/* quick links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li className="hover:text-white">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/mens">Shop</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/barcode-scanner">Barcode Scanner</Link>
            </li>
          </ul>
        </div>
        {/* customer service */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Customer Service
          </h2>
          <ul className="space-y-2">
            <li className="hover:text-white">
              <Link to="/faqs">FAQ's</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/shipping-returns">Shipping & Returns</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/size-guide">Size Guide</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/track-order">Track Order</Link>
            </li>
          </ul>
        </div>
        {/* Follow us */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white">
              <FaSquareXTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      {/* copyright section */}
      <div className="bg-gray-800 text-center py-4">
        <p>&copy; {new Date().getFullYear()} Nike Shoes. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
