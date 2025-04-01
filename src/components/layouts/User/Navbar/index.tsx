import React, { useEffect } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Navbar() {
  interface Session {
    data: {
      accessToken?: string;
      expires?: string;
      user?: {
        id?: string;
        email?: string;
        fullname?: string;
        name?: string;
        image?: string;
      };
    } | null;
    status: "loading" | "authenticated" | "unauthenticated";
  }

  const { data, status } = useSession() as Session;

  useEffect(() => {
    console.log(data);
  }, [data]);

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
            <Link
              href="#home"
              className="hover:text-gray-400 transall clicked flexc"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="hover:text-gray-400 transall clicked flexc"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:text-gray-400 transall clicked flexc"
            >
              Contact
            </Link>
          </li>
          {data ? (
            <li>
              <div className="hover:text-gray-400 transall clicked flexc">
                {`name ==> ${data?.user?.fullname}`}
              </div>
            </li>
          ) : (
            ""
          )}
          <li>
            {status === "loading" ? (
              <button className="text-gray-400 transall">Loading</button>
            ) : data ? (
              <button
                onClick={() => {
                  signOut();
                }}
                className="hover:text-gray-400 transall clicked"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  signIn();
                }}
                className="hover:text-gray-400 transall clicked"
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
