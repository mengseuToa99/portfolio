'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Package, Instagram, BookOpen } from 'lucide-react';
import tms5 from '@/public/tms5.png';
import Image from 'next/image';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [hologramIntensity, setHologramIntensity] = useState(0);
  const [glitchFrame, setGlitchFrame] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Using a different approach for the animation frame ref

// Replace this line:
const animationFrameRef = useRef<number | null>(null) as React.MutableRefObject<number | null>;

  // Initialize after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Holographic scanline animation
  useEffect(() => {
    if (!isMounted) return;

    const animateScanline = () => {
      setScanlinePosition(prev => (prev + 2) % 100);
    animationFrameRef.current = requestAnimationFrame(animateScanline) as number;
    };
animationFrameRef.current = requestAnimationFrame(animateScanline) as number;

// With this:
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

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Holographic distortion effect
      if (imageRef.current && imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angleX = (e.clientY - centerY) / 25;
        const angleY = (centerX - e.clientX) / 25;

        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) +
          Math.pow(e.clientY - centerY, 2)
        );

        const distortionStrength = Math.max(0, 1 - distance / 400);
        const translateX = (e.clientX - centerX) * distortionStrength * 0.15;
        const translateY = (e.clientY - centerY) * distortionStrength * 0.15;

        imageRef.current.style.transform = `
          perspective(1200px)
          rotateX(${angleX}deg)
          rotateY(${angleY}deg)
          translateX(${translateX}px)
          translateY(${translateY}px)
          scale(${isHovering ? 1.08 : 1.02})
        `;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (contentRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = contentRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const scrollSpeed = 1.5;
        const newScrollLeft = scrollLeft + (e.deltaY * scrollSpeed);
        const clampedScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));

        contentRef.current.scrollLeft = clampedScrollLeft;

        const progress = clampedScrollLeft / maxScroll;
        setScrollProgress(progress);

        const sectionWidth = maxScroll / 2;
        const currentSectionIndex = Math.round(clampedScrollLeft / sectionWidth);
        const sections = ['about', 'experience', 'projects'];
        setActiveSection(sections[currentSectionIndex] || 'about');

        isScrolling.current = true;

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          isScrolling.current = false;
          snapToSection(currentSectionIndex);
        }, 100);
      }
    };

    const snapToSection = (sectionIndex: number) => {
      if (contentRef.current) {
        const { scrollWidth, clientWidth } = contentRef.current;
        const sectionWidth = (scrollWidth - clientWidth) / 2;
        const targetScrollLeft = sectionWidth * sectionIndex;

        contentRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });

        const progress = sectionIndex / 2;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const scrollContainer = contentRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isHovering, isMounted]);

  const gradientStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
  };

  const scrollToSection = (sectionIndex: number) => {
    if (contentRef.current) {
      const { scrollWidth, clientWidth } = contentRef.current;
      const sectionWidth = (scrollWidth - clientWidth) / 2;
      const targetScrollLeft = sectionWidth * sectionIndex;

      contentRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });

      const progress = sectionIndex / 2;
      setScrollProgress(progress);

      const sections = ['about', 'experience', 'projects'];
      setActiveSection(sections[sectionIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="fixed inset-0 transition-all duration-300 pointer-events-none"
        style={gradientStyle}
      />

      <div className="relative flex min-h-screen">
        {/* Left Sidebar - Fixed */}
        <div className="w-1/2 fixed left-0 top-0 h-screen flex flex-col justify-between p-12 lg:p-20">
          <div>
            {/* Holographic Profile Image Animation */}
            <div
              ref={imageContainerRef}
              className="relative mb-8 w-48 h-48 mx-auto lg:mx-0"
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
                    transition: 'transform 0.5s ease-out'
                  }}
                ></div>
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
                  {/* Horizontal circles */}
                  {[30, 50, 70, 90, 110, 130, 150, 170].map((y, i) => (
                    <ellipse
                      key={`h-${i}`}
                      cx="100"
                      cy={y}
                      rx={Math.sqrt(10000 - Math.pow(y - 100, 2))}
                      ry="5"
                      fill="none"
                      stroke="url(#wireframeGradient)"
                      strokeWidth="0.5"
                      opacity={0.3 + (i * 0.05)}
                      style={{
                        filter: `drop-shadow(0 0 ${isHovering ? '8px' : '4px'} rgba(0, 255, 255, 0.8))`,
                        animation: `pulse ${2 + i * 0.2}s ease-in-out infinite`
                      }}
                    />
                  ))}
                  {/* Vertical circles */}
                  {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
                    <ellipse
                      key={`v-${i}`}
                      cx={x}
                      cy="100"
                      rx="5"
                      ry={Math.sqrt(10000 - Math.pow(x - 100, 2))}
                      fill="none"
                      stroke="url(#wireframeGradient)"
                      strokeWidth="0.5"
                      opacity={0.3 + (i * 0.05)}
                      style={{
                        filter: `drop-shadow(0 0 ${isHovering ? '8px' : '4px'} rgba(255, 0, 255, 0.8))`,
                        animation: `pulse ${2.5 + i * 0.2}s ease-in-out infinite`
                      }}
                    />
                  ))}
                </svg>
              )}

              {/* Holographic scanlines */}
              {isMounted && (
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div
                    className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
                    style={{
                      top: `${scanlinePosition}%`,
                      filter: 'blur(1px)',
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)'
                    }}
                  ></div>
                  <div
                    className="absolute w-full h-px bg-cyan-400 opacity-40"
                    style={{
                      top: `${(scanlinePosition + 20) % 100}%`
                    }}
                  ></div>
                  <div
                    className="absolute w-full h-px bg-cyan-400 opacity-20"
                    style={{
                      top: `${(scanlinePosition + 40) % 100}%`
                    }}
                  ></div>
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
                  boxShadow: isHovering
                    ? '0 0 60px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(255, 0, 255, 0.4)'
                    : '0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 15px rgba(255, 0, 255, 0.2)',
                  border: isHovering ? '2px solid rgba(0, 255, 255, 0.6)' : '1px solid rgba(0, 255, 255, 0.3)',
                  background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)'
                }}
              >
                <Image
                  src={tms5}
                  alt="Profile"
                  fill
                  className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-90 scale-100' : 'opacity-0 scale-110'}`}
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    filter: isHovering
                      ? 'contrast(1.2) brightness(1.1) saturate(1.3) hue-rotate(180deg)'
                      : 'contrast(1.1) brightness(1.05) saturate(1.1)',
                    mixBlendMode: 'screen',
                    transition: 'filter 0.3s ease-out'
                  }}
                />

                {/* Holographic glitch overlay */}
                {isMounted && isHovering && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(${glitchFrame}deg, transparent 45%, rgba(0, 255, 255, 0.2) 50%, transparent 55%)`,
                      mixBlendMode: 'overlay',
                      animation: 'glitch 0.2s infinite'
                    }}
                  ></div>
                )}

                {/* Data corruption effect */}
                {isMounted && isHovering && (
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-px bg-cyan-400"
                        style={{
                          top: `${20 + i * 20}%`,
                          left: `${Math.random() * 100}%`,
                          width: `${Math.random() * 50 + 20}%`,
                          transform: `translateX(${Math.random() * 10 - 5}px)`,
                          opacity: Math.random() * 0.5 + 0.2
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>

              {/* Floating holographic particles */}
              {isMounted && (
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        left: `${Math.sin(Date.now() / 1000 + i) * 40 + 50}%`,
                        top: `${Math.cos(Date.now() / 1000 + i) * 40 + 50}%`,
                        opacity: 0.6,
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
                        animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    ></div>
                  ))}
                </div>
              )}

              {/* Corner holographic indicators */}
              <div className="absolute top-2 left-2 w-3 h-3 border border-cyan-400 animate-pulse"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border border-magenta-400 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border border-green-400 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border border-cyan-400 animate-pulse" style={{ animationDelay: '0.9s' }}></div>
            </div>

            <h1 className="text-5xl font-bold text-slate-100 mb-4">
              Tai Mengseu
            </h1>
            <h2 className="text-xl text-slate-200 mb-6">Web Developer</h2>
            <p className="text-slate-400 mb-12 max-w-sm">
              I build accessible, pixel-perfect digital experiences for the web.
            </p>

            {/* Navigation */}
            <nav className="mb-16">
              <ul className="space-y-4">
                {['about', 'experience', 'projects'].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => {
                        const sectionIndex = ['about', 'experience', 'projects'].indexOf(section);
                        scrollToSection(sectionIndex);
                      }}
                      className="group flex items-center gap-4 text-sm uppercase tracking-widest"
                    >
                      <span
                        className={`h-px transition-all duration-300 ${activeSection === section
                          ? 'w-16 bg-slate-100'
                          : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-300'
                          }`}
                      />
                      <span
                        className={`transition-colors duration-300 ${activeSection === section
                          ? 'text-slate-100'
                          : 'text-slate-500 group-hover:text-slate-100'
                          }`}
                      >
                        {section}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
              <Linkedin size={24} />
            </a>
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
              <Package size={24} />
            </a>
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
              <BookOpen size={24} />
            </a>
          </div>
        </div>

        {/* Right Content - Horizontal Scroll on Vertical Scroll */}
        <div className="w-1/2 ml-auto h-screen overflow-hidden">
          <div
            ref={contentRef}
            className="h-full overflow-x-auto overflow-y-hidden"
            style={{
              scrollbarWidth: 'none',
              scrollBehavior: isScrolling.current ? 'auto' : 'smooth'
            }}
          >
            <div
              className="flex h-full"
              style={{
                width: '300%'
              }}
            >
              {/* About Section */}
              <section className="w-1/3 flex-shrink-0 p-12 lg:p-20 h-screen overflow-hidden">
                <div className="h-full flex flex-col justify-center">
                  <div className="space-y-6">
                    <p className="text-slate-400 leading-relaxed">
                      I'm a developer passionate about crafting accessible, pixel-perfect user
                      interfaces that blend thoughtful design with robust engineering. My favorite
                      work lies at the intersection of design and development, creating experiences
                      that not only look great but are meticulously built for performance and usability.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      Currently, I'm a Senior Front-End Engineer at{' '}
                      <a href="#" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium">
                        Klaviyo
                      </a>
                      , specializing in accessibility. I contribute to the creation and maintenance of UI components
                      that power Klaviyo's frontend, ensuring our platform meets web accessibility
                      standards and best practices to deliver an inclusive user experience.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      In the past, I've had the opportunity to develop software across a variety of
                      settings — from{' '}
                      <span className="text-slate-100">advertising agencies</span> and{' '}
                      <span className="text-slate-100">large corporations</span> to{' '}
                      <span className="text-slate-100">start-ups</span> and{' '}
                      <span className="text-slate-100">small digital product studios</span>. Additionally, I also released a{' '}
                      <span className="text-slate-100">comprehensive video course</span> a few years ago, guiding learners through building a web app with
                      the Spotify API.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      In my spare time, I'm usually climbing, playing tennis, hanging out with my wife
                      and two cats, or running around Hyrule searching for{' '}
                      <span className="text-slate-100">Korok seeds</span>.
                    </p>
                  </div>
                </div>
              </section>

              {/* Experience Section */}
              <section className="w-1/3 flex-shrink-0 p-12 lg:p-20 h-screen overflow-hidden">
                <div className="h-full flex flex-col">
                  <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-8">
                    Experience
                  </h2>

                  <div className="flex-1 overflow-y-auto pr-4 space-y-6">
                    <div className="group relative transition-all duration-300 hover:bg-slate-800/50 p-6 -mx-6 rounded-lg">
                      <div className="flex gap-6">
                        <div className="text-xs text-slate-500 uppercase tracking-wide min-w-[120px] mt-1">
                          2024 — Present
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-100 font-medium mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            Senior Frontend Engineer, Accessibility · Klaviyo →
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams to implement accessible UI patterns and ensure WCAG compliance throughout the platform.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Accessibility', 'Design Systems'].map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative transition-all duration-300 hover:bg-slate-800/50 p-6 -mx-6 rounded-lg">
                      <div className="flex gap-6">
                        <div className="text-xs text-slate-500 uppercase tracking-wide min-w-[120px] mt-1">
                          2018 — 2024
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-100 font-medium mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            Senior Frontend Engineer · Upstatement →
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Delivered high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, and more.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {['JavaScript', 'React', 'Vue', 'SCSS', 'WordPress'].map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative transition-all duration-300 hover:bg-slate-800/50 p-6 -mx-6 rounded-lg">
                      <div className="flex gap-6">
                        <div className="text-xs text-slate-500 uppercase tracking-wide min-w-[120px] mt-1">
                          2016 — 2018
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-100 font-medium mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            Frontend Developer · MullenLowe →
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Collaborated with creative and development teams to create custom advertising solutions and engaging digital experiences for major brand campaigns.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {['HTML', 'CSS', 'JavaScript', 'jQuery'].map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative transition-all duration-300 hover:bg-slate-800/50 p-6 -mx-6 rounded-lg">
                      <div className="flex gap-6">
                        <div className="text-xs text-slate-500 uppercase tracking-wide min-w-[120px] mt-1">
                          2015 — 2016
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-100 font-medium mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            Web Developer · Starry →
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Worked on a team responsible for building the front-end of Starry's customer-facing web app. Developed and styled interactive web pages using ES6, Handlebars, and CSS.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {['JavaScript', 'HTML', 'CSS', 'Handlebars'].map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a href="#" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium text-sm inline-flex items-center group">
                      View Full Resume
                      <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                    </a>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section className="w-1/3 flex-shrink-0 p-12 lg:p-20 h-screen overflow-hidden">
                <div className="h-full flex flex-col">
                  <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-8">
                    Projects
                  </h2>

                  <div className="flex-1 overflow-y-auto pr-4 space-y-6">
                    <div className="group relative transition-all duration-300 hover:bg-slate-800/50 p-6 -mx-6 rounded-lg">
                      <div className="flex flex-col">
                        <h3 className="text-slate-100 font-medium mb-3 group-hover:text-blue-400 transition-colors duration-300">
                          Build a Spotify Connected App →
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                          Video course that teaches how to build a web app with the Spotify API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, and more.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Express', 'Spotify API', 'Node'].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="group relative transition-all duration-300 hover:bg-slate-800/50 p-6 -mx-6 rounded-lg">
                      <div className="flex flex-col">
                        <h3 className="text-slate-100 font-medium mb-3 group-hover:text-blue-400 transition-colors duration-300">
                          Spotify Profile →
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                          Web app for visualizing personalized Spotify data. View your top artists, tracks, and playlists, see detailed audio information, and create and save new playlists.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Express', 'Styled Components', 'Spotify API'].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="group relative transition-all duration-300 hover:bg-slate-800/50 p-6 -mx-6 rounded-lg">
                      <div className="flex flex-col">
                        <h3 className="text-slate-100 font-medium mb-3 group-hover:text-blue-400 transition-colors duration-300">
                          Halcyon Theme →
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                          A minimal, dark blue theme for VS Code, Sublime Text, Atom, and more. Available on Visual Studio Marketplace, Package Control, and Atom Package Manager.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {['VS Code', 'Sublime Text', 'Theme'].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <a href="#" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium text-sm inline-flex items-center group">
                      View Full Project Archive
                      <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator with Section Dots */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3">
        <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-400 transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          {['about', 'experience', 'projects'].map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section
                ? 'bg-blue-400 w-8'
                : 'bg-slate-600 hover:bg-slate-400'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(5px) translateX(-5px); }
          75% { transform: translateY(-5px) translateX(10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }
        
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}