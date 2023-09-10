import React from "react";
import { Routes, Route} from "react-router-dom";

import AuthPage from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";


const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
