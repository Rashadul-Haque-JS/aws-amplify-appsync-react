import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const HomePage = () => {
    const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-16 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            {isLogin ? 'Login' : 'Register'}
            </h2>
            {isLogin ? <Login /> : <Register setIsLogin={setIsLogin}/>}
            <hr className="my-6 border-gray-300 w-full" />
            <p className="text-gray-700">
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-blue-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
            >
                {isLogin ? 'Register' : 'Login'}
            </button>
            </p>
        </div>
      
    </div>
  );
};

export default HomePage;