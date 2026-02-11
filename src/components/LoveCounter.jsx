import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './LoveCounter.css';

// Approximate start date — adjust as needed
const START_DATE = new Date('2018-09-11T00:00:00');

function calculateDuration() {
    const now = new Date();
    const diff = now - START_DATE;

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365.25);
    const months = Math.floor((totalDays % 365.25) / 30.44);
    const days = Math.floor(totalDays % 30.44);

    return { years, months, days, totalDays };
}

function CounterCard({ value, label, delay }) {
    const [displayValue, setDisplayValue] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * value));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const timer = setTimeout(() => requestAnimationFrame(animate), delay);
        return () => clearTimeout(timer);
    }, [inView, value, delay]);

    return (
        <motion.div
            ref={ref}
            className="counter-card glass-card"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: delay / 1000, ease: 'easeOut' }}
        >
            <span className="counter-value shimmer-text">{displayValue}</span>
            <span className="counter-label">{label}</span>
        </motion.div>
    );
}

export default function LoveCounter() {
    const [duration, setDuration] = useState(calculateDuration);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(calculateDuration());
        }, 60000); // update every minute
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="love-counter-section" ref={ref}>
            <motion.h2
                className="love-counter-title"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                เรารักกันมาแล้ว... 💗
            </motion.h2>

            <div className="counter-grid">
                <CounterCard value={duration.years} label="ปี" delay={0} />
                <CounterCard value={duration.months} label="เดือน" delay={200} />
                <CounterCard value={duration.days} label="วัน" delay={400} />
            </div>

            <motion.p
                className="counter-total"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                รวมทั้งหมด <strong>{duration.totalDays.toLocaleString()}</strong> วัน ที่มีความสุขด้วยกัน ✨
            </motion.p>
        </section>
    );
}
