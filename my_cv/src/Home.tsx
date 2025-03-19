import React, { useState } from "react";
import { motion } from "framer-motion";


const Home: React.FC = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("John Doe");
    return (
        <motion.div
            className="page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}>
            <h1>Home</h1>
            <p>Current Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <div>
                <h1>Enter Your Name</h1>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p>Your name is: {name}</p>
            </div>
        </motion.div>
    );
};

export default Home;
