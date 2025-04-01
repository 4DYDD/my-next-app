import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

interface UserProps {
  // Define your props here
  children: ReactNode;
  className?: string;
}

const inter = Inter({ subsets: ["latin"] });

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

function User({ children }: UserProps) {
  const { pathname } = useRouter();

  return (
    <main className={`${inter.className} h-screen flexc flex-col`}>
      {!disableNavbar.includes(pathname) && <Navbar />}
      <div className="h-full flexc flex-col w-full">{children}</div>
      {!disableNavbar.includes(pathname) && <Footer />}
    </main>
  );
}

export default User;
