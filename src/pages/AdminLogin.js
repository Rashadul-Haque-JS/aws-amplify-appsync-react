import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const IAMLoginForm = () => {
  const [accessKeyId, setAccessKeyId] = useState("");
  const [secretAccessKey, setSecretAccessKey] = useState("");
  const [temp, setTemp] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await Auth.signIn(accessKeyId, secretAccessKey);
      navigate("/profile");
    } catch (error) {
      console.error("Error logging in:", error);
      setTemp(error.message);
    }
  };

  useEffect(() => {
    if(temp){
      setTimeout(() => {
        setTemp("");
      }, 3000);
    }
  },[temp])

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 min-h-screen pt-10 px-5 gap-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Admin Login
      </h2>
        {temp && <p className="text-red-400 text-center py-4">{temp}</p>}
      <div className="flex justify-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleLogin}>
          <div className="my-3">
            <label>Access Key ID</label>
            <input
              type="text"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="my-3">
            <label>Secret Access Key</label>
            <input
              type="password"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-2 my-6 font-semibold hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default IAMLoginForm;
