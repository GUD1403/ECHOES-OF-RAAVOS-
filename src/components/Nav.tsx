import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onToggleArchive: () => void;
  isArchiveOpen: boolean;
}

export default function Nav({ currentView, onNavigate, onScrollToSection, onToggleArchive, isArchiveOpen }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for nav header transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleLinkClick = (sectionId: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        onScrollToSection(sectionId);
      }, 500); // Wait for transition out
    } else {
      onScrollToSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  const handleOrderClick = () => {
    onNavigate('order');
    setMobileMenuOpen(false);
  };

  const handleArchiveClick = () => {
    onToggleArchive();
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="nav"
      className={`fixed top-0 left-0 right-0 z-[500] flex justify-between items-center px-6 md:px-16 py-5 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-4'
          : 'bg-transparent'
      }`}
    >
      {/* Brand Logo */}
      <span
        onClick={handleLogoClick}
        className="nav-brand font-decorative text-sm md:text-md text-gold select-none filter drop-shadow-[0_0_15px_rgba(200,168,75,0.4)] tracking-[0.14em] cursor-none hover:drop-shadow-[0_0_24px_rgba(200,168,75,0.7)] transition-all"
      >
        ⚡ Echoes of Raavos
      </span>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-9 list-none">
        <li>
          <a
            onClick={() => handleLinkClick('#books')}
            className="font-cinzel text-[10px] tracking-[0.28em] text-text-d hover:text-gold uppercase relative pb-1 transition-colors cursor-none before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[1px] before:bg-gold before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-300"
          >
            Books
          </a>
        </li>
        <li>
          <a
            onClick={() => handleLinkClick('#chapters')}
            className="font-cinzel text-[10px] tracking-[0.28em] text-text-d hover:text-gold uppercase relative pb-1 transition-colors cursor-none before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[1px] before:bg-gold before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-300"
          >
            Chapters
          </a>
        </li>
        <li>
          <a
            onClick={() => handleLinkClick('#characters')}
            className="font-cinzel text-[10px] tracking-[0.28em] text-text-d hover:text-gold uppercase relative pb-1 transition-colors cursor-none before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[1px] before:bg-gold before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-300"
          >
            Characters
          </a>
        </li>
        <li>
          <a
            onClick={() => handleLinkClick('#author')}
            className="font-cinzel text-[10px] tracking-[0.28em] text-text-d hover:text-gold uppercase relative pb-1 transition-colors cursor-none before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[1px] before:bg-gold before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-300"
          >
            Author
          </a>
        </li>
        <li>
          <a
            onClick={handleOrderClick}
            className={`font-cinzel text-[10px] tracking-[0.28em] uppercase relative pb-1 transition-colors cursor-none before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[1px] before:bg-gold before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-300 ${
              currentView === 'order' ? 'text-gold' : 'text-text-d hover:text-gold'
            }`}
          >
            Enter the Order
          </a>
        </li>
        <li>
          <a
            id="nav-archive"
            onClick={handleArchiveClick}
            className={`font-cinzel text-[10px] tracking-[0.28em] uppercase relative pb-1 transition-colors cursor-none before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[1px] before:bg-blue before:origin-left before:transition-transform before:duration-300 ${
              isArchiveOpen 
                ? 'text-blue/90 before:scale-x-100' 
                : 'text-text-d hover:text-blue before:scale-x-0 hover:before:scale-x-100'
            }`}
          >
            The Archive
          </a>
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-text hover:text-gold focus:outline-none cursor-none"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Links Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-gold/10 py-6 px-8 flex flex-col gap-5 z-[499] md:hidden shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
          <a
            onClick={() => handleLinkClick('#books')}
            className="font-cinzel text-[11px] tracking-[0.2em] text-text-d hover:text-gold uppercase cursor-none"
          >
            Books
          </a>
          <a
            onClick={() => handleLinkClick('#chapters')}
            className="font-cinzel text-[11px] tracking-[0.2em] text-text-d hover:text-gold uppercase cursor-none"
          >
            Chapters
          </a>
          <a
            onClick={() => handleLinkClick('#characters')}
            className="font-cinzel text-[11px] tracking-[0.2em] text-text-d hover:text-gold uppercase cursor-none"
          >
            Characters
          </a>
          <a
            onClick={() => handleLinkClick('#author')}
            className="font-cinzel text-[11px] tracking-[0.2em] text-text-d hover:text-gold uppercase cursor-none"
          >
            Author
          </a>
          <a
            onClick={handleOrderClick}
            className={`font-cinzel text-[11px] tracking-[0.2em] uppercase cursor-none ${
              currentView === 'order' ? 'text-gold' : 'text-text-d'
            }`}
          >
            Enter the Order
          </a>
          <a
            onClick={handleArchiveClick}
            className={`font-cinzel text-[11px] tracking-[0.2em] uppercase cursor-none ${
              isArchiveOpen ? 'text-blue' : 'text-text-d'
            }`}
          >
            The Archive
          </a>
        </div>
      )}
    </nav>
  );
}
