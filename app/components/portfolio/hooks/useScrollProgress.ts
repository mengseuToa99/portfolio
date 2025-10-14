import { useState, useEffect, useRef } from 'react';

export function useScrollProgress(
    contentRef: React.RefObject<HTMLDivElement>,
    isMobile: boolean
) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('about');
    const isScrolling = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const scrollToSection = (sectionIndex: number) => {
        const sections = ['about', 'experience', 'projects'];
        const sectionId = sections[sectionIndex];

        if (isMobile) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(sectionId);
            }
        } else {
            if (contentRef.current) {
                const { scrollWidth, clientWidth } = contentRef.current;
                const sectionWidth = (scrollWidth - clientWidth) / 2;
                const targetScrollLeft = sectionWidth * sectionIndex;

                contentRef.current.scrollTo({
                    left: targetScrollLeft,
                    behavior: 'smooth',
                });

                const progress = sectionIndex / 2;
                setScrollProgress(progress);
                setActiveSection(sectionId);
            }
        }
    };

    // Desktop/Tablet: Horizontal scroll on wheel
    useEffect(() => {
        if (isMobile || !contentRef.current) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const container = contentRef.current;
            if (!container) return;

            const { scrollLeft, scrollWidth, clientWidth } = container;
            const maxScroll = scrollWidth - clientWidth;
            const scrollSpeed = 1.5;
            const newScrollLeft = scrollLeft + e.deltaY * scrollSpeed;
            const clampedScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));

            container.scrollLeft = clampedScrollLeft;

            const progress = clampedScrollLeft / maxScroll;
            setScrollProgress(progress);

            const sectionWidth = maxScroll / 2;
            const currentSectionIndex = Math.round(clampedScrollLeft / sectionWidth);
            const sections = ['about', 'experience', 'projects'];
            setActiveSection(sections[currentSectionIndex] || 'about');

            isScrolling.current = true;
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                isScrolling.current = false;
                scrollToSection(currentSectionIndex);
            }, 100);
        };

        const scrollContainer = contentRef.current;
        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            scrollContainer.removeEventListener('wheel', handleWheel);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [isMobile, contentRef]);

    // Mobile: Vertical scroll tracking
    useEffect(() => {
        if (!isMobile) return;

        const handleScroll = () => {
            const sections = ['about', 'experience', 'projects'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }

            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress(currentScroll / documentHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    return { scrollProgress, activeSection, scrollToSection };
}