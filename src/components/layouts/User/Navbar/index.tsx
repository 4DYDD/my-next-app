import React from "react";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white w-full">
      <div className="container mx-auto px-4 py-3 flexc !justify-between">
        {/* Logo */}
        <div className="flexc gap-3 w-52">
          <Image
            height={48}
            width={48}
            src="https://plus.unsplash.com/premium_photo-1661962960694-0b4ed303744f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Logo"
            className="h-12 w-12 rounded-full"
          />
          <span className="text-lg font-semibold">My App</span>
        </div>

        {/* Menu */}
        <ul className="flex space-x-8 mx-2">
          <li>
            <a href="#home" className="hover:text-gray-400 transall">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-400 transall">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400 transall">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
