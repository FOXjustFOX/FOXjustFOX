import React from "react";
import { motion } from "framer-motion";
import SnakeGame from "./components/SnakeGame";

const Home: React.FC = () => {
    return (
        <motion.div
            className="w-full bg-gray-1000 flex items-center justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <SnakeGame />
        </motion.div>
    );
};

export default Home;
