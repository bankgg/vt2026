import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Footer.css';

export default function Footer() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <footer className="footer-section" ref={ref}>
            <div className="footer-glow" />

            <motion.div
                className="footer-content"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <motion.div
                    className="footer-heart"
                    animate={{
                        scale: [1, 1.15, 1, 1.15, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                >
                    💖
                </motion.div>

                <h2 className="footer-title shimmer-text">
                    I'll Love You Forever
                </h2>

                <p className="footer-message">
                    ไม่ว่าจะ...
                    <br />
                    8 ปี, 10 ปี, 50 ปี หรือตลอดไป
                    <br />
                    ขอแค่มีเธออยู่ข้าง ๆ ก็พอแล้ว 🥰
                </p>

                <div className="footer-divider" />

                <p className="footer-closing">
                    สุขสันต์วันวาเลนไทน์ 2026
                    <br />
                    <span className="footer-hearts">💕 ด้วยรักจากหัวใจ 💕</span>
                </p>

                <motion.div
                    className="footer-infinite"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    <span className="footer-ring">💗</span>
                </motion.div>

                <p className="footer-from">จาก แบงก์ 💌</p>
            </motion.div>
        </footer>
    );
}
