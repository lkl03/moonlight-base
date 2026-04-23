'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ChevronIconWrap,
  DesktopLinks,
  MobileCenterButton,
  MobileMenu,
  MobileMenuButton,
  NavButton,
  ScrollTopButton,
  ThemeDivider,
  ThemeIconSlot,
  ThemeToggle,
  Wrapper,
} from './styles';

const navItems = [
  { label: 'What We Do', target: 'what-we-do' },
  { label: 'How It Works', target: 'how-it-works' },
  { label: 'Portfolio', target: 'portfolio' },
  { label: 'Services', target: 'services' },
  { label: 'Pricing', target: 'pricing' },
  { label: 'FAQ', target: 'faq' },
  { label: 'Contact', target: 'contact' },
] as const;

type NavTarget = (typeof navItems)[number]['target'];
type ThemePreview = 'dark' | 'light';

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 18V6M12 6L7.5 10.5M12 6L16.5 10.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M6.75 9.75L12 15L17.25 9.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M20.4 14.2A8.7 8.7 0 1 1 12 3.6a7.1 7.1 0 0 0 8.4 10.6Z"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.85" />
    <path d="M12 2.75V5.1" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M12 18.9V21.25" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M21.25 12H18.9" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M5.1 12H2.75" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M18.55 5.45L16.9 7.1" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M7.1 16.9L5.45 18.55" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M18.55 18.55L16.9 16.9" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M7.1 7.1L5.45 5.45" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
  </svg>
);

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState<NavTarget>('what-we-do');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [themePreview, setThemePreview] = useState<ThemePreview>('dark');
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.target))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id as NavTarget);
        }
      },
      {
        rootMargin: '-35% 0px -40% 0px',
        threshold: [0.15, 0.35, 0.55, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const scrollToSection = (sectionId: NavTarget) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const scrollToTop = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeLabel = navItems.find((item) => item.target === activeSection)?.label ?? 'What We Do';

  return (
    <Wrapper ref={navRef} aria-label="Section navigation">
      <ScrollTopButton type="button" onClick={scrollToTop} aria-label="Back to top">
        <ArrowUpIcon />
      </ScrollTopButton>

      <DesktopLinks aria-label="Page sections">
        {navItems.map((item) => (
          <NavButton
            key={item.target}
            type="button"
            $isActive={activeSection === item.target}
            onClick={() => scrollToSection(item.target)}
          >
            {item.label}
          </NavButton>
        ))}
      </DesktopLinks>

      <MobileCenterButton
        type="button"
        $isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-expanded={isMobileMenuOpen}
        aria-controls="floating-nav-mobile-menu"
      >
        <span>{activeLabel}</span>
        <ChevronIconWrap $isOpen={isMobileMenuOpen}>
          <ChevronDownIcon />
        </ChevronIconWrap>
      </MobileCenterButton>

      <ThemeToggle
        type="button"
        onClick={() =>
          setThemePreview((prev) => (prev === 'dark' ? 'light' : 'dark'))
        }
        aria-label={`Toggle theme preview to ${themePreview === 'dark' ? 'light' : 'dark'}`}
      >
        <ThemeIconSlot $isActive={themePreview === 'dark'}>
          <MoonIcon />
        </ThemeIconSlot>
        <ThemeDivider aria-hidden="true" />
        <ThemeIconSlot $isActive={themePreview === 'light'}>
          <SunIcon />
        </ThemeIconSlot>
      </ThemeToggle>

      <MobileMenu id="floating-nav-mobile-menu" $isOpen={isMobileMenuOpen} role="menu">
        {navItems.map((item) => (
          <MobileMenuButton
            key={item.target}
            type="button"
            role="menuitem"
            $isActive={activeSection === item.target}
            onClick={() => scrollToSection(item.target)}
          >
            {item.label}
          </MobileMenuButton>
        ))}
      </MobileMenu>
    </Wrapper>
  );
};

export default FloatingNav;
