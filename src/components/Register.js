import React, { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AuthContext } from "../pages/Auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // Add state for verification code
  const [error, setError] = useState("");
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false); // Track if code has been sent
  
  const {setIsLogin, setMessage }= useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isVerificationCodeSent) {
        // If verification code has been sent, confirm registration
        await Auth.confirmSignUp(email, verificationCode);
        setMessage("Registration successful! Please sign in.");
        setIsLogin(true);
      } else {
        // If verification code has not been sent, initiate the registration process
        const signUpResponse = await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            name: name,
          },
        });

        setMessage("A verification code has been sent to your email address");
        setIsVerificationCodeSent(true); // Set flag to show verification code input field
      }
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="bg-white py-8 px-4 rounded-lg shadow-md w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-600 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Email address"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Password"
            required
          />
        </div>
        {isVerificationCodeSent && (
          <div className="mb-4">
            <label
              htmlFor="verificationCode"
              className="block font-medium mb-2 text-red-500"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter verification code"
              required
              
            />
          </div>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition duration-300"
        >
          {isVerificationCodeSent ? "Confirm Registration" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
