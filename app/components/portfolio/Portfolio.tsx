'use client';

import { useState, useRef, useEffect } from 'react';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import { useMousePosition } from './hooks/useMousePosition';
import { useHolographicEffects } from './hooks/useHolographicEffects';
import { useScrollProgress } from './hooks/useScrollProgress';
import { HolographicImage } from './ui/HolographicImage';
import { SocialLinks } from './ui/SocialLinks';
import { Navigation } from './ui/Navigation';
import { MobileMenu } from './ui/MobileMenu';
import { ScrollProgress } from './ui/ScrollProgress';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';

export default function Portfolio() {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const { isSmallMobile, isMobile, isTablet, isDesktop } = useDeviceDetection();
    const mousePosition = useMousePosition();
    const { scanlinePosition, hologramIntensity, glitchFrame } = useHolographicEffects(isHovering, isMounted);
    const { scrollProgress, activeSection, scrollToSection } = useScrollProgress(contentRef, isMobile);

    useEffect(() => setIsMounted(true), []);

    const gradientStyle = {
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="fixed inset-0 transition-all duration-300 pointer-events-none" style={gradientStyle} />

            {/* Mobile View - Simple Vertical Scrolling */}
            {isMobile ? (
                <div className="relative min-h-screen">
                    {/* Header Section */}
                    <div className="flex flex-col items-center justify-center min-h-screen p-6">
                        <HolographicImage
                            mousePosition={mousePosition}
                            isHovering={isHovering}
                            setIsHovering={setIsHovering}
                            scanlinePosition={scanlinePosition}
                            hologramIntensity={hologramIntensity}
                            glitchFrame={glitchFrame}
                            isMobile={isMobile}
                            isSmallMobile={isSmallMobile}
                        />
                        <h1 className={`${isSmallMobile ? 'text-2xl' : 'text-3xl'} font-bold text-slate-100 mb-4 text-center`}>Tai Mengseu</h1>
                        <h2 className={`${isSmallMobile ? 'text-base' : 'text-lg'} text-slate-200 mb-6 text-center`}>Web Developer</h2>
                        <p className={`text-slate-400 mb-12 ${isSmallMobile ? 'text-xs' : 'text-sm'} text-center px-4`}>I build accessible, pixel-perfect digital experiences for the web.</p>
                        <SocialLinks />
                    </div>

                    <AboutSection isMobile={isMobile} isSmallMobile={isSmallMobile} />
                    <ExperienceSection isMobile={isMobile} isSmallMobile={isSmallMobile} />
                    <ProjectsSection isMobile={isMobile} isSmallMobile={isSmallMobile} />

                    <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} activeSection={activeSection} scrollToSection={scrollToSection} />
                    <ScrollProgress scrollProgress={scrollProgress} activeSection={activeSection} scrollToSection={scrollToSection} isMobile={isMobile} isSmallMobile={isSmallMobile} />
                </div>
            ) : (
                /* Desktop/Tablet View - Horizontal Scrolling */
                <div className="relative flex min-h-screen">
                    {/* Left Sidebar - Fixed */}
                    <div className={`${isTablet ? 'w-2/5' : 'w-1/2'} fixed left-0 top-0 h-screen flex flex-col justify-between p-3 sm:p-4 md:p-8 lg:p-12 xl:p-20`}>
                        <div>
                            <HolographicImage
                                mousePosition={mousePosition}
                                isHovering={isHovering}
                                setIsHovering={setIsHovering}
                                scanlinePosition={scanlinePosition}
                                hologramIntensity={hologramIntensity}
                                glitchFrame={glitchFrame}
                                isMobile={isMobile}
                                isSmallMobile={isSmallMobile}
                            />
                            <h1 className={`${isTablet ? 'text-4xl' : 'text-5xl'} font-bold text-slate-100 mb-4 lg:text-left`}>Tai Mengseu</h1>
                            <h2 className="text-xl text-slate-200 mb-6 lg:text-left">Web Developer</h2>
                            <p className="text-slate-400 mb-12 max-w-sm">Dedicated Web Developer with 1 year of professional experience in Laravel framework development and backend integration.</p>
                            <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
                        </div>
                        <SocialLinks />
                    </div>

                    {/* Right Content - Horizontal Scroll on Vertical Scroll */}
                    <div className={`${isTablet ? 'w-3/5' : 'w-1/2'} ml-auto h-screen overflow-hidden`}>
                        <div ref={contentRef} className="h-full overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none' }}>
                            <div className="flex h-full" style={{ width: '300%' }}>
                                <AboutSection isMobile={isMobile} isSmallMobile={isSmallMobile} />
                                <ExperienceSection isMobile={isMobile} isSmallMobile={isSmallMobile} />
                                <ProjectsSection isMobile={isMobile} isSmallMobile={isSmallMobile} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Scroll Progress Indicator with Section Dots - Only show on desktop/tablet */}
            {!isMobile && <ScrollProgress scrollProgress={scrollProgress} activeSection={activeSection} scrollToSection={scrollToSection} isMobile={isMobile} isSmallMobile={isSmallMobile} />}

            {/* Custom animations */}
            <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(5px) translateX(-5px);
          }
          75% {
            transform: translateY(-5px) translateX(10px);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(-1px, -1px);
          }
          60% {
            transform: translate(1px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
          100% {
            transform: translate(0);
          }
        }
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}