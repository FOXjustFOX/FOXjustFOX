import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="container">
            <nav>
                <Link className="link" to="/">
                    Home
                </Link>
                <Link className="link" to="/projects">
                    Projects
                </Link>
                <Link className="link" to="/about">
                    About
                </Link>
                <a className="link" href="https://api.lis.rocks">
                    Solvro API
                </a>
            </nav>
            <Outlet /> {/* This is where child routes will be rendered */}
        </div>
    );
};

export default Layout;
