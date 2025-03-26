import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface UserProps {
  // Define your props here
  children: ReactNode;
  className?: string;
}

function User({ children }: UserProps) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default User;
