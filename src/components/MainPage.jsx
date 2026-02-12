import { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import HeroSection from './HeroSection';
import LoveCounter from './LoveCounter';
import MemoryTimeline from './MemoryTimeline';
import GiftBox from './GiftBox';
import Footer from './Footer';
import './MainPage.css';

export default function MainPage() {
    const [showFooter, setShowFooter] = useState(false);

    return (
        <motion.div
            className="main-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            <div className="main-bg" />
            <FloatingHearts count={25} />

            <div className="main-content">
                <HeroSection />
                <LoveCounter />
                <MemoryTimeline />
                <GiftBox onReveal={() => setShowFooter(true)} />
                {showFooter && <Footer />}
            </div>
        </motion.div>
    );
}
