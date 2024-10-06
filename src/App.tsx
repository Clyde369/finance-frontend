import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className="min-h-screen">
            {showLogin ? <Login /> : <Signup />}
            <button
                onClick={toggleForm}
                className="absolute top-4 right-4 px-4 py-2 bg-white bg-opacity-20 rounded-full text-white text-sm font-medium hover:bg-opacity-30"
            >
                {showLogin ? "Go to Signup" : "Go to Login"}
            </button>
        </div>
    );
}