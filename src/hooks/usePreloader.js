import { useState, useEffect, useRef, useCallback } from 'react';

const IMAGE_COUNT = 36;
const IMAGE_BASE_PATH = '/images/';
const EXTRA_IMAGES = ['/images/me.jpg'];

export function usePreloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadedCountRef = useRef(0);
  const totalAssetsRef = useRef(IMAGE_COUNT + EXTRA_IMAGES.length + 1); // images + extras + font

  const updateProgress = useCallback(() => {
    loadedCountRef.current += 1;
    const newProgress = Math.round(
      (loadedCountRef.current / totalAssetsRef.current) * 100
    );
    setProgress(newProgress);
    if (loadedCountRef.current >= totalAssetsRef.current) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Preload font
    if (document.fonts && document.fonts.load) {
      document.fonts
        .load('1em Prompt')
        .then(() => updateProgress())
        .catch(() => updateProgress());
    } else {
      updateProgress(); // Skip font check if API not available
    }

    // Preload all images
    for (let i = 1; i <= IMAGE_COUNT; i++) {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = `${IMAGE_BASE_PATH}${i}.jpg`;
    }

    // Preload extra images (gift box, etc.)
    EXTRA_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = src;
    });
  }, [updateProgress]);

  return { progress, isLoaded };
}
