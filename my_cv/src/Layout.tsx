import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="container">
            <nav>
                <Link className="link" to="/">
                    <p>Home</p>
                </Link>
                <Link className="link" to="/projects">
                    <p>Projects</p>
                </Link>
                <Link className="link" to="/files">
                    <p>Files</p>
                </Link>
                <a className="link" href="https://winietki.lis.rocks">
                    <p>Generator winietek</p>
                </a>
            </nav>
            <Outlet /> {/* This is where child routes will be rendered */}
        </div>
    );
};

export default Layout;
