import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="container">
            <nav className="fixed top-0 left-0 w-full bg-dark/90 backdrop-blur-sm z-50 border-b border-gray-700">
                <div className="max-w-7xl mx-auto flex justify-center space-x-8 py-4 px-6">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                    
                    <Link className="nav-link" to="/projects">
                        Projects
                    </Link>
                    <Link className="nav-link" to="/files">
                        Files
                    </Link>
                    <Link className="nav-link" to="/about">
                        About Me
                    </Link>
                    <a
                        className="nav-link"
                        href="https://winietki.lis.rocks"
                        target="_blank"
                        rel="noopener noreferrer">
                        Generator winietek
                    </a>
                </div>
            </nav>
            <main className="pt-20 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
