import { useState, useEffect } from 'react';

export function useHolographicEffects(isHovering: boolean, isMounted: boolean) {
    const [scanlinePosition, setScanlinePosition] = useState(0);
    const [hologramIntensity, setHologramIntensity] = useState(0);
    const [glitchFrame, setGlitchFrame] = useState(0);

    // Holographic scanline animation
    useEffect(() => {
        if (!isMounted) return;
        const animationFrameRef = { current: null as number | null };

        const animateScanline = () => {
            setScanlinePosition((prev) => (prev + 2) % 100);
            animationFrameRef.current = requestAnimationFrame(animateScanline);
        };
        animationFrameRef.current = requestAnimationFrame(animateScanline);

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isMounted]);

    // Hologram flicker effect
    useEffect(() => {
        if (!isMounted) return;
        const interval = setInterval(() => {
            setHologramIntensity(Math.random() * 0.3 + 0.7);
        }, 100);
        return () => clearInterval(interval);
    }, [isMounted]);

    // Glitch effect
    useEffect(() => {
        if (!isMounted || !isHovering) return;
        const glitchInterval = setInterval(() => {
            setGlitchFrame(Math.random() * 100);
        }, 50);
        return () => clearInterval(glitchInterval);
    }, [isHovering, isMounted]);

    return { scanlinePosition, hologramIntensity, glitchFrame };
}