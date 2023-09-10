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
      }, 3000)
    }

  },[message])

  return (
    <AuthContext.Provider value={{ setIsLogin, setMessage }}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {message && <p className="text-center py-5 text-green-500">{message}</p>}
        <div className="bg-white py-16 px-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}
          <hr className="my-6 border-gray-300 w-full" />
          <p className="text-gray-700">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default HomePage;
