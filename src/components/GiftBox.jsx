import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GiftBox.css';

function Sparkle({ index, total }) {
    const angle = (index / total) * Math.PI * 2;
    const distance = 120 + Math.random() * 150;
    const size = Math.random() * 12 + 6;
    const sparkles = ['✨', '🌟', '⭐', '💫', '🎉', '🎊', '💖', '💝', '🎀'];

    return (
        <motion.span
            className="gift-sparkle"
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: [1, 1, 0],
                scale: [0, 1.5, 0],
            }}
            transition={{
                duration: 1.2,
                ease: 'easeOut',
                delay: Math.random() * 0.3,
            }}
            style={{ fontSize: `${size}px` }}
        >
            {sparkles[index % sparkles.length]}
        </motion.span>
    );
}

export default function GiftBox({ onReveal }) {
    // idle → shaking → lidPop → sparkles → slideUp → done
    const [phase, setPhase] = useState('idle');
    const particles = useMemo(() => Array.from({ length: 50 }, (_, i) => i), []);
    const sectionRef = useRef(null);

    const handleOpen = () => {
        if (phase !== 'idle') return;

        // Smoothly scroll to center the gift box
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Phase 1: Box shakes with anticipation
        setPhase('shaking');

        // Phase 2: Lid pops off dramatically
        setTimeout(() => setPhase('lidPop'), 1800);

        // Phase 3: Sparkle explosion
        setTimeout(() => setPhase('sparkles'), 2600);

        // Phase 4: Image slides up slowly
        setTimeout(() => setPhase('slideUp'), 3800);

        // Phase 5: Text reveals
        setTimeout(() => {
            setPhase('done');
            if (onReveal) onReveal();
        }, 6000);
    };

    const isLidGone = phase !== 'idle' && phase !== 'shaking';
    const isSliding = phase === 'slideUp' || phase === 'done';

    // Shaking intensifies over time
    const shakeAnimation = phase === 'shaking' ? {
        x: [0, -3, 3, -4, 4, -5, 5, -6, 6, -7, 7, -5, 5, 0],
        rotate: [0, -1, 1, -1.5, 1.5, -2, 2, -2.5, 2.5, -2, 2, -1, 1, 0],
    } : {};

    return (
        <section className="gift-section" ref={sectionRef}>
            <div className="gift-stage">
                {/* Prompt text */}
                <AnimatePresence>
                    {phase === 'idle' && (
                        <motion.p
                            className="gift-prompt-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            และของขวัญพิเศษสำหรับเธอ...
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Gift box assembly */}
                <motion.div
                    className="gift-box-wrapper"
                    onClick={handleOpen}
                    style={{ cursor: phase === 'idle' ? 'pointer' : 'default' }}
                    animate={shakeAnimation}
                    transition={phase === 'shaking' ? {
                        duration: 1.8,
                        ease: 'easeInOut',
                    } : {}}
                >
                    {/* Glow — intensifies during shaking */}
                    <motion.div
                        className="gift-glow"
                        animate={
                            phase === 'idle'
                                ? { opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }
                                : phase === 'shaking'
                                    ? { opacity: [0.4, 0.9, 0.4, 0.95, 0.5], scale: [1, 1.15, 1, 1.2, 1.1] }
                                    : { opacity: 0.9, scale: 1.4 }
                        }
                        transition={{
                            duration: phase === 'idle' ? 2 : 1.2,
                            repeat: (phase === 'idle' || phase === 'shaking') ? Infinity : 0,
                        }}
                    />

                    {/* Sparkles burst */}
                    {(phase === 'sparkles' || phase === 'slideUp') && (
                        <div className="gift-sparkles-origin">
                            {particles.map((i) => (
                                <Sparkle key={i} index={i} total={particles.length} />
                            ))}
                        </div>
                    )}

                    {/* Image container — clipped inside track */}
                    <div className="gift-image-track">
                        <motion.div
                            className="gift-image-slider"
                            animate={isSliding ? { y: '15%' } : { y: '100%' }}
                            transition={{
                                duration: 2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <div className="gift-image-card glass-card">
                                <img
                                    src="/images/me.jpg"
                                    alt="ของขวัญจากแบงก์"
                                    className="gift-image"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Lid — shakes with box, then pops off */}
                    <motion.div
                        className="gift-lid-3d"
                        animate={isLidGone ? {
                            y: -250,
                            rotateZ: 35,
                            opacity: 0,
                            scale: 0.4,
                        } : phase === 'shaking' ? {
                            y: [0, -6, 0, -8, 0, -10, 0, -12, 0, -8, 0],
                        } : {}}
                        transition={isLidGone ? {
                            duration: 0.7,
                            ease: [0.32, 0, 0.67, 0],
                        } : {
                            duration: 1.8,
                            ease: 'easeInOut',
                        }}
                    >
                        <div className="lid-top" />
                        <div className="lid-ribbon-h" />
                        <div className="lid-bow">
                            <div className="bow-loop bow-left" />
                            <div className="bow-loop bow-right" />
                            <div className="bow-knot" />
                        </div>
                    </motion.div>

                    {/* Box body */}
                    <div className="gift-body-3d">
                        <div className="body-front">
                            <span className="gift-name-tag">For Pat</span>
                        </div>
                        <div className="body-ribbon-v" />

                        {/* Light beam shoots up after lid is gone */}
                        {isLidGone && (
                            <motion.div
                                className="gift-light-beam"
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: [0, 0.9, 0.6, 0.2, 0], scaleY: [0, 1, 1.5, 2, 2.5] }}
                                transition={{ duration: 2.5, ease: 'easeOut' }}
                            />
                        )}
                    </div>
                </motion.div>

                {/* Tap hint */}
                <AnimatePresence>
                    {phase === 'idle' && (
                        <motion.p
                            key="tap-hint"
                            className="gift-tap-hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            แตะเพื่อเปิด 💝
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Surprise text during sparkles */}
                <AnimatePresence>
                    {(phase === 'sparkles' || phase === 'slideUp') && (
                        <motion.p
                            key="surprise"
                            className="gift-tada-text shimmer-text"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: [0.5, 1.15, 1] }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            ✨ เซอร์ไพรส์! ✨
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Reveal text */}
                <AnimatePresence>
                    {phase === 'done' && (
                        <motion.div
                            className="gift-reveal-text-area"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="gift-reveal-text">
                                ก็คือเราเอง 😜
                            </p>
                            <motion.p
                                className="gift-reveal-subtext"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                ให้ทั้งตัวและหัวใจเลย อิอิ 💕
                            </motion.p>

                            <motion.div
                                className="scroll-hint"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, y: [0, 10, 0] }}
                                transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
                            >
                                <span className="scroll-arrow">↓</span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
