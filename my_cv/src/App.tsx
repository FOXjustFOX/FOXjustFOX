import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence
import Layout from "./Layout";
import Home from "./Home";
import Projects from "./Projects";
import RepoDetails from "./RepoDetails";
import FileExplorer from "./FileExplorer"; // Import the FileExplorer component
import AboutMe from "./AboutMe"; // Import the AboutMe component
import { NotFound } from "./components";

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
                        <Route
                            path="/files"
                            element={
                                <FileExplorer
                                    onFileSelect={(file) =>
                                        console.log("Selected file:", file)
                                    }
                                />
                            }
                        />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default App;
