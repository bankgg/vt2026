import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HeroSection.css';

export default function HeroSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <section className="hero-section" ref={ref}>
            <div className="hero-bg-glow" />

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <motion.div
                    className="hero-emoji"
                    animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
                >
                    💕
                </motion.div>

                <h1 className="hero-title">
                    <span className="shimmer-text">Happy Valentine's Day</span>
                    <br />
                    <span className="hero-year">2026</span>
                </h1>

                <motion.div
                    className="hero-divider"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '80px' } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    เกือบ 8 ปีแล้วนะ ที่เราเคียงข้างกัน...
                </motion.p>

                <motion.p
                    className="hero-message"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    ขอบคุณที่อยู่เคียงข้างกันมาตลอด
                    <br />
                    ทุกช่วงเวลาที่อยู่ด้วยกัน เรามีความสุขที่สุดเลย!
                </motion.p>
            </motion.div>

            <motion.div
                className="hero-scroll-hint"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
            >
                <span className="hero-scroll-arrow">↓</span>
            </motion.div>
        </section>
    );
}
