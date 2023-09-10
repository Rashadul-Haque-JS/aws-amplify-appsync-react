import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth, Hub } from "aws-amplify"; 

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up a listener for authentication events using Hub
    const authListener = (data) => {
      switch (data.payload.event) {
        case "signIn":
          setUser(data.payload.data);
          break;
        case "signOut":
          setUser(null);
          break;
        default:
          break;
      }
    };

    Hub.listen("auth", authListener);

    // Check the initial authentication state
    Auth.currentAuthenticatedUser()
      .then((userData) => setUser(userData))
      .catch(() => setUser(null));

    // Clean up the listener when the component unmounts
    return () => Hub.remove("auth", authListener);
  }, []);

  const navigations = [
    { name: "Dashboard", href: "/" },
    { name: user ? "Profile" : "Login", href: user ? "/profile" : "/auth" }, 
  ];

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await Auth.signOut(); // Sign out the user
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex justify-end items-center h-16 bg-teal-400 text-black relative shadow-sm font-mono" role="navigation">
      {navigations.map((navigation) => (
        <div className="px-4 cursor-pointer hover:bg-gray-200" key={navigation.name}>
          {navigation.name === "Profile" ? (
            <span onClick={handleLogout}>{navigation.name}</span>
          ) : (
            <Link to={navigation.href}>{navigation.name}</Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
