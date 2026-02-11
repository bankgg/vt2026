import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EntranceAnimation.css';

function Particle({ index, total }) {
    const angle = (index / total) * Math.PI * 2;
    const distance = 300 + Math.random() * 200;
    const size = Math.random() * 12 + 6;
    const hearts = ['♥', '♡', '❤', '💗', '✨', '💖'];

    return (
        <motion.span
            className="entrance-particle"
            initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 0,
            }}
            animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: [0, 1.5, 0],
            }}
            transition={{
                duration: 1.8,
                ease: 'easeOut',
                delay: 0.2 + Math.random() * 0.3,
            }}
            style={{ fontSize: `${size}px` }}
        >
            {hearts[index % hearts.length]}
        </motion.span>
    );
}

export default function EntranceAnimation({ onComplete }) {
    const [phase, setPhase] = useState('burst'); // burst → fadeWhite → done

    const particles = useMemo(
        () => Array.from({ length: 40 }, (_, i) => i),
        []
    );

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase('fadeWhite'), 1500);
        const timer2 = setTimeout(() => {
            setPhase('done');
            onComplete();
        }, 2800);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="entrance-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Center heart burst */}
                    {phase === 'burst' && (
                        <div className="entrance-center">
                            <motion.div
                                className="entrance-main-heart"
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: [0, 1.5, 1.2], rotate: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                💖
                            </motion.div>

                            <div className="entrance-particles">
                                {particles.map((i) => (
                                    <Particle key={i} index={i} total={particles.length} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fade to soft pink then transparent */}
                    {phase === 'fadeWhite' && (
                        <motion.div
                            className="entrance-fade"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.3, ease: 'easeInOut' }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
