import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      {user ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div className="mb-4">
            <strong>Name:</strong> {user.attributes.name}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {user.attributes.email}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
