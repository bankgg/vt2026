import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import './PasswordGate.css';

const CORRECT_PASSWORD = '0813737917';
const STORAGE_KEY = 'vt2026_auth';

export default function PasswordGate({ onSuccess }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            localStorage.setItem(STORAGE_KEY, 'true');
            setUnlocked(true);
            // Request fullscreen on user gesture
            document.documentElement.requestFullscreen?.().catch(() => { });
            setTimeout(() => onSuccess(), 600);
        } else {
            setError(true);
            setPassword('');
            inputRef.current?.focus();
        }
    };

    return (
        <AnimatePresence>
            {!unlocked && (
                <motion.div
                    className="password-gate"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <FloatingHearts count={15} />

                    <motion.div
                        className="password-card glass-card"
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                        <motion.div
                            className="password-heart-icon"
                            animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        >
                            💕
                        </motion.div>

                        <h1 className="password-title">เฉพาะคนพิเศษเท่านั้น</h1>
                        <p className="password-subtitle">ใส่รหัสผ่านเพื่อเข้าสู่ความทรงจำของเรา...</p>
                        <p className="password-hint">💡 Hint: เบอร์โทรศัพท์เรา (ห้ามแอบดูนะ!)</p>

                        <form onSubmit={handleSubmit} className="password-form">
                            <motion.div
                                className={`password-input-wrapper ${error ? 'shake' : ''}`}
                                animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <input
                                    ref={inputRef}
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError(false);
                                    }}
                                    placeholder="ใส่รหัสผ่าน..."
                                    className="password-input"
                                    autoFocus
                                    autoComplete="off"
                                    inputMode="numeric"
                                />
                            </motion.div>

                            {error && (
                                <motion.p
                                    className="password-error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    รหัสผ่านไม่ถูกต้อง ลองใหม่นะ 💔
                                </motion.p>
                            )}

                            <motion.button
                                type="submit"
                                className="password-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                เปิดหัวใจ 💗
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
