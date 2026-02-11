import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './MemoryTimeline.css';

const SWEET_MESSAGES = [
    'อยู่ด้วยกันตั้งแต่ตอนยังหน้าผอม ๆ... 😂',
    'ทุกช่วงเวลาที่เราอยู่ด้วยกัน คือช่วงเวลาที่ดีที่สุด ✨',
    'อย่าเพิ่งเบื่อกันนะ... 🥺',
    'ไม่มีเธอ เราก็คงไม่มีวันนี้ 💕',
    'ไม่ว่าจะกี่ปีผ่านไป ก็ยังรักเหมือนวันแรก... 💗',
    'ขอบคุณที่ตระเวนหาประสบการณ์ใหม่ ๆ ร่วมกันตลอด ✈️',
    'ไม่ว่าจะทุกข์หรือสุข เราจะคอยอยู่ข้างกันเสมอ 🤝',
    'กินกันไม่ยั้ง จนหน้าอ้วนกันหมดแล้ว 5555 🍕',
    'ไม่ว่าจะไปไหน ก็อยากให้เรามีความทรงจำร่วมกันนะ 📸',
    'ไม่เคยรักเธอน้อยลงสักวันเดียว... ❤️',
    'ขอบคุณที่ทำให้รู้ว่า คู่ชีวิตที่ดีเป็นยังไง 💍',
    'อยู่กับเราต่อไปเรื่อย ๆ เลยนะ ♾️',
];

const IMAGE_COUNT = 36;

function MemoryCard({ index }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
    });

    const imageNum = index + 1;
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className={`memory-card ${isEven ? 'from-left' : 'from-right'}`}
            initial={{
                opacity: 0,
                x: isEven ? -40 : 40,
                y: 30,
            }}
            animate={
                inView
                    ? { opacity: 1, x: 0, y: 0 }
                    : {}
            }
            transition={{
                duration: 0.7,
                ease: 'easeOut',
            }}
        >
            <div className="memory-card-inner glass-card">
                <div className="memory-image-wrapper">
                    <img
                        src={`/images/${imageNum}.jpg`}
                        alt={`ความทรงจำที่ ${imageNum}`}
                        className="memory-image"
                        loading="lazy"
                    />
                    <div className="memory-image-overlay" />
                </div>
            </div>

            {/* Dot on timeline */}
            <div className="memory-dot">
                <div className="memory-dot-inner" />
            </div>
        </motion.div>
    );
}

function SweetMessage({ message, index }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <motion.div
            ref={ref}
            className="sweet-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <p>{message}</p>
        </motion.div>
    );
}

export default function MemoryTimeline() {
    const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 });

    const items = [];
    let msgIndex = 0;

    for (let i = 0; i < IMAGE_COUNT; i++) {
        items.push(<MemoryCard key={`img-${i}`} index={i} />);

        // Insert a sweet message every 3 images
        if ((i + 1) % 3 === 0 && msgIndex < SWEET_MESSAGES.length) {
            items.push(
                <SweetMessage
                    key={`msg-${msgIndex}`}
                    message={SWEET_MESSAGES[msgIndex]}
                    index={msgIndex}
                />
            );
            msgIndex++;
        }
    }

    return (
        <section className="memory-timeline-section">
            <motion.div
                ref={titleRef}
                className="memory-title-wrapper"
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
            >
                <h2 className="memory-title">ความทรงจำของเรา</h2>
                <p className="memory-subtitle">89 เดือนที่ผ่านมา... เป็นเวลาที่มีค่าที่สุดเลย 💕</p>
            </motion.div>

            <div className="timeline-container">
                <div className="timeline-line" />
                {items}
            </div>
        </section>
    );
}
