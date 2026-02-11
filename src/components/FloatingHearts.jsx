import { useMemo } from 'react';
import './FloatingHearts.css';

const HEART_CHARS = ['♥', '♡', '❤', '💕', '💗', '💖'];

export default function FloatingHearts({ count = 20 }) {
    const hearts = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            char: HEART_CHARS[i % HEART_CHARS.length],
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 18 + 10}px`,
            duration: `${Math.random() * 15 + 10}s`,
            delay: `${Math.random() * 20}s`,
            opacity: Math.random() * 0.3 + 0.1,
        }));
    }, [count]);

    return (
        <div className="floating-hearts-container" aria-hidden="true">
            {hearts.map((heart) => (
                <span
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: heart.left,
                        fontSize: heart.size,
                        animationDuration: heart.duration,
                        animationDelay: heart.delay,
                        '--heart-opacity': heart.opacity,
                    }}
                >
                    {heart.char}
                </span>
            ))}
        </div>
    );
}
