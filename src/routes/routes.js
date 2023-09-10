import React from "react";
import { Routes, Route} from "react-router-dom";

import AuthPage from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import IAMLoginForm from "../pages/AdminLogin";


const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<IAMLoginForm />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
