import React from "react";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white w-full">
      <div className="container mx-auto px-4 py-3 flexc !justify-between">
        {/* Logo */}
        <div className="flexc gap-3 w-52">
          <Image
            width={2000}
            height={2000}
            src="https://img.freepik.com/premium-vector/modern-shoes-logo-template-design_316488-856.jpg?w=2000"
            alt="Logo"
            className="rounded-full w-16"
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
