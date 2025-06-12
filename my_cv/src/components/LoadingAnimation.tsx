import { motion } from "framer-motion";

// Loading component with animation
const LoadingAnimation = () => {
    return (
        <motion.div
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <motion.div
                className="loading-circle"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                    borderRadius: ["20%", "50%", "20%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.p
                animate={{
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}>
                Loading repositories...
            </motion.p>
        </motion.div>
    );
};

export default LoadingAnimation;
