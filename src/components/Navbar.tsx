import { useState, useEffect, useRef } from 'react';
import { Eye, Menu, X, Calendar } from 'lucide-react';
import { navLinks } from '@/config/site';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      if (currentY < 20) {
        setVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-600/20">
            <Eye className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <span className="block font-display text-lg font-bold leading-tight text-slate-900">
              SkyView
            </span>
            <span className="block text-xs font-medium leading-tight text-primary-600">
              Eye Centre
            </span>
          </div>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                currentPath === link.path
                  ? 'text-primary-700'
                  : 'text-slate-600 hover:text-primary-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button onClick={() => handleNavClick('/book')} className="btn-primary">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="animate-slide-down border-t border-slate-100 bg-white md:hidden">
          <div className="container-page space-y-1 py-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('/book')}
              className="btn-primary mt-2 w-full"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
