import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

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
      navigate("/");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await Auth.currentAuthenticatedUser().then((user) => {
        return Auth.deleteUser({ user });
      });
      setUser(null); // Clear user data after deletion
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="w-full min-h-screen relative">
      {user ? (
        <div className="text-center" style={{opacity:showDeleteModal?.5:1}}>
          <h2 className="text-2xl font-semibold p-8">Profile</h2>
          <div className="flex flex-wrap justify-evenly items-center mt-8 gap-8">
            <div className="flex justify-center items-center">
              <img
                src="https://via.placeholder.com/200"
                alt="profile"
                className="rounded-full"
              />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
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
              <button
                onClick={handleDeleteAccount}
                className="w-full mt-4 bg-red-500 text-white rounded-lg py-2 font-semibold hover:bg-red-600 transition duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center py-10">Loading user data...</p>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal fixed inset-1/3 sm:inset-4 md:inset-6 shadow-lg p-8 bg-gray-400 text-white rounded">
          <div className="modal-content">
            <h3 className="text-xl font-semibold text-black py-5">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="modal-buttons py-5">
              <button
                onClick={confirmDeleteAccount}
                className="bg-red-500 text-white rounded-lg py-2 px-4 font-semibold hover:bg-red-600 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white rounded-lg py-2 px-4 ml-4 font-semibold hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

