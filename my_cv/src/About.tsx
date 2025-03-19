import React, { useState } from "react";
import { motion } from "framer-motion";


const About: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <motion.div
        className="page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
    >
      <h1>About</h1>
      <p>Current about Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      </motion.div>

  );
};

export default About;