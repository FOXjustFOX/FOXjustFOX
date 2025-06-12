import { motion } from "framer-motion";

// Loading component with animation
const LoadingAnimation = () => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center space-y-6 p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <motion.div
                className="w-16 h-16 bg-gradient-primary rounded-full shadow-lg shadow-primary/30"
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
                className="text-lg text-gray-300 font-medium"
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
