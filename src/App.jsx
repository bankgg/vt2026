import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePreloader } from './hooks/usePreloader';
import PasswordGate from './components/PasswordGate';
import LoadingScreen from './components/LoadingScreen';
import EntranceAnimation from './components/EntranceAnimation';
import MainPage from './components/MainPage';

const STORAGE_KEY = 'vt2026_auth';

export default function App() {
    // Check localStorage on mount
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    });
    const [showEntrance, setShowEntrance] = useState(false);
    const [showMain, setShowMain] = useState(false);

    const { progress, isLoaded } = usePreloader();

    const handlePasswordSuccess = useCallback(() => {
        setIsAuthenticated(true);
    }, []);

    const handleEntranceComplete = useCallback(() => {
        setShowMain(true);
    }, []);

    // When authenticated and loaded, show entrance
    useEffect(() => {
        if (isAuthenticated && isLoaded && !showEntrance && !showMain) {
            // Small delay for smoother transition
            const timer = setTimeout(() => setShowEntrance(true), 300);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, isLoaded, showEntrance, showMain]);

    return (
        <>
            <AnimatePresence mode="wait">
                {/* State 1: Password gate (if not authenticated) */}
                {!isAuthenticated && (
                    <PasswordGate key="password" onSuccess={handlePasswordSuccess} />
                )}

                {/* State 2: Loading (authenticated but not loaded) */}
                {isAuthenticated && !isLoaded && (
                    <LoadingScreen key="loading" progress={progress} />
                )}

                {/* State 3: Entrance animation */}
                {showEntrance && !showMain && (
                    <EntranceAnimation key="entrance" onComplete={handleEntranceComplete} />
                )}
            </AnimatePresence>

            {/* State 4: Main page (persists once shown) */}
            {showMain && <MainPage />}
        </>
    );
}
