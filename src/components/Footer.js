import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-sm">
        <p>&copy; {new Date().getFullYear()} Dokan</p>
        <p>All rights reserved</p>
      </div>
      <div className="text-sm">
        <Link to="/admin" className="text-blue-500 hover:text-blue-700">
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Footer;
