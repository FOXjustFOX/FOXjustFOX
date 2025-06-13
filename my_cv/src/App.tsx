import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components";
import { Home, About, Projects, RepoDetails, FileExplorer, NotFound } from "./pages";

import "./styles/styles.css";

const App: React.FC = () => {
    const location = useLocation(); // Get current route location

    return (
        <div className="container">
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
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
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </AnimatePresence>
        </div>
    );
};

export default App;
