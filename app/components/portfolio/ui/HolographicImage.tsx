import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import tms5 from '@/public/tms5.png';

interface HolographicImageProps {
    mousePosition: { x: number; y: number };
    isHovering: boolean;
    setIsHovering: (hovering: boolean) => void;
    scanlinePosition: number;
    hologramIntensity: number;
    glitchFrame: number;
    isMobile: boolean;
    isSmallMobile: boolean;
}

export function HolographicImage({
    mousePosition,
    isHovering,
    setIsHovering,
    scanlinePosition,
    hologramIntensity,
    glitchFrame,
    isMobile,
    isSmallMobile,
}: HolographicImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => setIsMounted(true), []);

    // Holographic distortion effect based on mouse
    useEffect(() => {
        if (!imageRef.current || !imageContainerRef.current || isMobile) return;

        const rect = imageContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angleX = (mousePosition.y - centerY) / 25;
        const angleY = (centerX - mousePosition.x) / 25;

        const distance = Math.sqrt(
            Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2)
        );

        const distortionStrength = Math.max(0, 1 - distance / 400);
        const translateX = (mousePosition.x - centerX) * distortionStrength * 0.15;
        const translateY = (mousePosition.y - centerY) * distortionStrength * 0.15;

        imageRef.current.style.transform = `
      perspective(1200px)
      rotateX(${angleX}deg)
      rotateY(${angleY}deg)
      translateX(${translateX}px)
      translateY(${translateY}px)
      scale(${isHovering ? 1.08 : 1.02})
    `;
    }, [mousePosition, isHovering, isMobile]);

    return (
        <div
            ref={imageContainerRef}
            className={`relative mb-6 ${isSmallMobile ? 'w-24 h-24' : isMobile ? 'w-32 h-32' : 'w-48 h-48'} mx-auto lg:mx-0`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Energy field background */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                    className="absolute inset-0 opacity-60"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.3), transparent 70%)`,
                        filter: 'blur(20px)',
                        transform: `scale(${isHovering ? 1.5 : 1.2})`,
                        transition: 'transform 0.5s ease-out',
                    }}
                />
            </div>

            {/* Holographic wireframe sphere */}
            {isMounted && (
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="wireframeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#00ff00" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                    {/* Horizontal and Vertical circles */}
                    {[30, 50, 70, 90, 110, 130, 150, 170].map((y, i) => (
                        <ellipse key={`h-${i}`} cx="100" cy={y} rx={Math.sqrt(10000 - Math.pow(y - 100, 2))} ry="5" fill="none" stroke="url(#wireframeGradient)" strokeWidth="0.5" opacity={0.3 + i * 0.05} style={{ filter: `drop-shadow(0 0 ${isHovering ? '8px' : '4px'} rgba(0, 255, 255, 0.8))`, animation: `pulse ${2 + i * 0.2}s ease-in-out infinite` }} />
                    ))}
                    {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
                        <ellipse key={`v-${i}`} cx={x} cy="100" rx="5" ry={Math.sqrt(10000 - Math.pow(x - 100, 2))} fill="none" stroke="url(#wireframeGradient)" strokeWidth="0.5" opacity={0.3 + i * 0.05} style={{ filter: `drop-shadow(0 0 ${isHovering ? '8px' : '4px'} rgba(255, 0, 255, 0.8))`, animation: `pulse ${2.5 + i * 0.2}s ease-in-out infinite` }} />
                    ))}
                </svg>
            )}

            {/* Holographic scanlines */}
            {isMounted && (
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" style={{ top: `${scanlinePosition}%`, filter: 'blur(1px)', boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)' }} />
                    <div className="absolute w-full h-px bg-cyan-400 opacity-40" style={{ top: `${(scanlinePosition + 20) % 100}%` }} />
                    <div className="absolute w-full h-px bg-cyan-400 opacity-20" style={{ top: `${(scanlinePosition + 40) % 100}%` }} />
                </div>
            )}

            {/* Main image with holographic effect */}
            <div
                ref={imageRef}
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.1s ease-out',
                    opacity: hologramIntensity,
                    boxShadow: isHovering ? '0 0 60px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(255, 0, 255, 0.4)' : '0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 15px rgba(255, 0, 255, 0.2)',
                    border: isHovering ? '2px solid rgba(0, 255, 255, 0.6)' : '1px solid rgba(0, 255, 255, 0.3)',
                    background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
                }}
            >
                <Image src={tms5} alt="Profile" fill className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-90 scale-100' : 'opacity-0 scale-110'}`} onLoad={() => setImageLoaded(true)} style={{ filter: isHovering ? 'contrast(1.2) brightness(1.1) saturate(1.3) hue-rotate(180deg)' : 'contrast(1.1) brightness(1.05) saturate(1.1)', mixBlendMode: 'screen', transition: 'filter 0.3s ease-out' }} />
                {isMounted && isHovering && <div className="absolute inset-0" style={{ background: `linear-gradient(${glitchFrame}deg, transparent 45%, rgba(0, 255, 255, 0.2) 50%, transparent 55%)`, mixBlendMode: 'overlay', animation: 'glitch 0.2s infinite' }} />}
                {isMounted && isHovering && (
                    <div className="absolute inset-0 opacity-30">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="absolute h-px bg-cyan-400" style={{ top: `${20 + i * 20}%`, left: `${Math.random() * 100}%`, width: `${Math.random() * 50 + 20}%`, transform: `translateX(${Math.random() * 10 - 5}px)`, opacity: Math.random() * 0.5 + 0.2 }} />
                        ))}
                    </div>
                )}
            </div>

            {/* Floating holographic particles */}
            {isMounted && (
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="absolute w-1 h-1 bg-cyan-400 rounded-full" style={{ left: `${Math.sin(Date.now() / 1000 + i) * 40 + 50}%`, top: `${Math.cos(Date.now() / 1000 + i) * 40 + 50}%`, opacity: 0.6, boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)', animation: `float ${3 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
                    ))}
                </div>
            )}

            {/* Corner holographic indicators */}
            <div className="absolute top-2 left-2 w-3 h-3 border border-cyan-400 animate-pulse" />
            <div className="absolute top-2 right-2 w-3 h-3 border border-magenta-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="absolute bottom-2 left-2 w-3 h-3 border border-green-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
            <div className="absolute bottom-2 right-2 w-3 h-3 border border-cyan-400 animate-pulse" style={{ animationDelay: '0.9s' }} />
        </div>
    );
}