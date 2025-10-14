interface ScrollProgressProps {
  scrollProgress: number;
  activeSection: string;
  scrollToSection: (index: number) => void;
  isMobile: boolean;
  isSmallMobile: boolean;
}

export function ScrollProgress({ scrollProgress, activeSection, scrollToSection, isMobile, isSmallMobile }: ScrollProgressProps) {
  return (
    <div className={`fixed ${isSmallMobile ? 'bottom-2 right-2' : 'bottom-4 right-4'} flex items-center gap-3`}>
      <div className={`${isSmallMobile ? 'w-16' : 'w-24'} h-1 bg-slate-800 rounded-full overflow-hidden`}>
        <div className="h-full bg-blue-400 transition-all duration-300" style={{ width: `${scrollProgress * 100}%` }} />
      </div>
      <div className="flex gap-2">
        {['about', 'experience', 'projects'].map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === section ? 'bg-blue-400 w-8' : 'bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}