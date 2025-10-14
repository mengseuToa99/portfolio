import { Menu, X } from 'lucide-react';
import { Navigation } from './Navigation';
import { SocialLinks } from './SocialLinks';

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  scrollToSection: (index: number) => void;
}

export function MobileMenu({ mobileMenuOpen, setMobileMenuOpen, activeSection, scrollToSection }: MobileMenuProps) {
  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-md bg-slate-800 text-slate-300"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center">
          <Navigation activeSection={activeSection} scrollToSection={(index) => { scrollToSection(index); setMobileMenuOpen(false); }} />
          <SocialLinks />
        </div>
      )}
    </>
  );
}