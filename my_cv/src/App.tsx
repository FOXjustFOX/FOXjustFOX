import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import Layout from "./Layout";
import Home from "./Home";
import Projects from "./Projects";
import RepoDetails from "./RepoDetails";

import "./styles.css";

const NotFound: React.FC = () => (
    <div className="page">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
    </div>
);

const App: React.FC = () => {
    const location = useLocation(); // Get current route location

    return (
        <div className="container">
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route
                            path="/projects/:repoName"
                            element={<RepoDetails />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default App;
