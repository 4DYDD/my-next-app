import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-3 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Next App. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with 🗿 using Next.js and Tailwind CSS, and also Github Copilot.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
