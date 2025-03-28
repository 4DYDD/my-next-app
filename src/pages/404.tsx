import Link from "next/link";
import React from "react";

function Custom404() {
  return (
    <div className="flexc flex-col h-screen bg-gray-900 w-[100vw] text-white text-center">
      <h1 className="text-6xl m-0">404</h1>
      <p className="text-xl my-4">
        {`Oops! The page you're looking for doesn't exist.`}
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Custom404;
