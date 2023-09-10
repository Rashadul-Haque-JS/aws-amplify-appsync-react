import React from "react";
import { BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/routes";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <BrowserRouter>
        <Navbar/>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;
