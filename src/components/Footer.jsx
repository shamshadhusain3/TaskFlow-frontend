// src/components/Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-gradient z-30 text-white py-6">
          <div className="ftrHeading flex justify-center items-center flex-col">
           <div className="logo flex  justify-center items-center"><img src="images/logo.png" alt="Logo" /> <h2 className="text-xl font-semibold mb-2"> TaskFlow</h2></div>
            <p className="text-sm mb-4">A Task Management System</p>
          </div>
      <div className="container mx-auto text-center md:flex justify-around w-full items-center w-50 ">
       <h1 className="text-2xl border-b-2 border-white text-white  text-center p-3"><a href="" className="underline underline-offset-2">Take a Tour</a></h1>
      </div>
    </footer>
  );
};

export default Footer;
