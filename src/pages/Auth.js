import React, { createContext, useEffect} from "react";

import Login from "../components/Login";
import Register from "../components/Register";

export const AuthContext = createContext();

const HomePage = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if(message){
      setTimeout(() => {
        setMessage("")
      }, 5000)
    }

  },[message])

  return (
    <AuthContext.Provider value={{ setIsLogin, setMessage }}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-2">
        {message && <p className="text-center py-5 text-green-700">{message}</p>}
        <div className="bg-white sm:px-0 md:px-6 rounded-lg shadow-md w-full max-w-md">
        <div className="bg-teal-400 py-16 px-8 sm:px-6 md:px-6" style={{ borderRadius: '140px 0 140px 0' }}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}
          <hr className="my-6 border-gray-300 w-full" />
          <p className="text-gray-700">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none px-2"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default HomePage;
