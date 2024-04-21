import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Interpreter from './Interpreter';
import Navbar from '../component/Navbar';
import DreamsData from './DreamData';

const HomePage = () => {
    const isAuthenticated = localStorage.getItem("name") !== null;
    

    useEffect(() => {
        const checkAuth = () => {
            if (localStorage.getItem("name") === null) {
               
            }
        };
        checkAuth();
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/interpreter" replace /> : <Login />}
                />
                <Route
                    path="/interpreter"
                    element={isAuthenticated ? <InterpreterWithNavbar /> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/dreams"
                    element={isAuthenticated ? <DreamDataWithNavbar /> : <Navigate to="/login" replace />}
                />
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

// CODE WITHOUT COOKIE AUTHENTICATION

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
