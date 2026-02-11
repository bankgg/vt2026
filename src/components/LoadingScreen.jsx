import { motion } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ progress }) {
    return (
        <motion.div
            className="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="loading-content">
                <motion.div
                    className="loading-heart"
                    animate={{
                        scale: [1, 1.2, 1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1.3,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                    }}
                >
                    💖
                </motion.div>

                <p className="loading-text">กำลังเตรียมความทรงจำ...</p>

                <div className="loading-bar-track">
                    <motion.div
                        className="loading-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </div>

                <p className="loading-progress">{progress}%</p>
            </div>
        </motion.div>
    );
}
