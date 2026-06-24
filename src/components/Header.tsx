import { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCvClick?: () => void;
}

export default function Header({ activeTab, setActiveTab, onCvClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'من نحن' },
    { id: 'services', label: 'الخدمات' },
    { id: 'portfolio', label: 'معرض الأعمال' },
    { id: 'ailab', label: 'مختبر AI' },
    { id: 'assistant', label: 'مساعد AI' },
    { id: 'library', label: 'المكتبة الذكية' },
    { id: 'achievements', label: 'الإنجازات' },
    { id: 'contact', label: 'راسلني' },
    ...(onCvClick ? [{ id: 'cv', label: 'السيرة الذاتية' }] : [])
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (id === 'cv' && onCvClick) {
      onCvClick();
      setIsOpen(false);
      return;
    }
    setActiveTab(id);
    window.location.hash = id;
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/80 border-b border-border-dark/80 py-4 backdrop-blur-md shadow-lg'
          : 'bg-transparent py-6'
      }`}
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo and branding */}
        <Logo className="cursor-pointer" onClick={() => handleNavClick('home')} />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 rounded-full border border-border-dark bg-neutral-900/40 p-1 backdrop-blur-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-brand text-black shadow-[0_0_15px_rgba(245,180,0,0.3)]'
                  : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>


        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg border border-border-dark bg-neutral-900/80 p-2 text-neutral-400 hover:text-white focus:outline-none cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-b border-border-dark bg-neutral-950/95 p-4 shadow-xl backdrop-blur-md">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-brand/10 text-brand border-r-4 border-brand'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-neutral-600 font-mono">0{navItems.indexOf(item) + 1}</span>
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-black shadow-md hover:bg-brand-dark cursor-pointer"
            >
              <PhoneCall size={16} />
              <span>ابدأ مشروعك الآن</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
