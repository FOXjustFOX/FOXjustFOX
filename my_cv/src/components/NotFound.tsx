import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
    <motion.div
        className="page flex flex-col items-center justify-center min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold text-gray-300">
                Page Not Found
            </h2>
            <p className="text-gray-400 max-w-md">
                Oops! The page you are looking for does not exist or has been
                moved.
            </p>
            <Link to="/" className="inline-block btn-primary mt-6">
                Go Home
            </Link>
        </div>
    </motion.div>
);

export default NotFound;
