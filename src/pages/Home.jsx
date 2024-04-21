import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Interpreter from './Interpreter';
import Navbar from '../component/Navbar';
import DreamsData from './DreamData';

const HomePage = () => {
    const isAuthenticated = localStorage.getItem("name") !== null;



    useEffect(() => {
        // Check for authentication whenever the component is re-rendered
        const checkAuth = () => {
            if (localStorage.getItem("name") === null) {
                // If not authenticated, redirect to login page
                return <Navigate to="/login" replace />;
            } else {
                // Refresh the page after successful login
                
            }
        };
        checkAuth();
    }, []);

    return (
        <Router>
            <Routes>
                {/* Redirect to /interpreter if authenticated */}
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/interpreter" replace /> : <Login />}
                />
                {/* Display InterpreterWithNavbar component if authenticated */}
                <Route
                    path="/interpreter"
                    element={isAuthenticated ? <InterpreterWithNavbar /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/dreams"
                    element={isAuthenticated ? <DreamDataWithNavbar /> : <Navigate to="/login" replace />}
                />
                {/* Redirect to /interpreter if authenticated, otherwise redirect to /login */}
                <Route
                    path="/*"
                    element={isAuthenticated ? <InterpreterWithNavbar /> : <Navigate to="/login" replace />}
                />
            </Routes>
        </Router>
    );
};

const InterpreterWithNavbar = () => {
    return (
        <>
            <Navbar />
            <Interpreter />
        </>
    );
};

const DreamDataWithNavbar = () => {
    return (
        <>
            <Navbar />
            <DreamsData />
        </>
    );
};

export default HomePage;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import DreamsData from '../pages/DreamData';
// import Login from './Login';
// import Interpreter from './Interpreter';
// import Navbar from '../component/Navbar';

// const HomePage = () => {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/interpreter" element={<Interpreter />} />
//                 <Route path="/dreams" element={<DreamsData />} />
//             </Routes>
//         </Router>
//     );
// };


// export default HomePage;
