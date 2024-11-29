'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

const navigation = [
  {
    name: 'Custom Clothing',
    href: '/custom-clothing',
  },
  {
    name: 'Safety Wear',
    href: '/safety-wear',
  },
  {
    name: 'Profile',
    href: '/profile',
  },
  {
    name: 'Articles',
    href: '/articles',
  },
];

export function PublicNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past the header height
        setIsVisible(false);
        // Close mobile menu when hiding nav
        setMobileMenuOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 bg-white z-50
        transition-all duration-300 transform
        shadow-md
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-body-sm transition-colors ${
                  pathname === item.href
                    ? 'text-brand-primary'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/catalogue-access"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-body-sm text-white bg-brand-primary hover:bg-brand-primary-dark transition-colors"
            >
              Access Catalogue
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-neutral-600 hover:text-neutral-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`
            md:hidden 
            transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            overflow-hidden
          `}
        >
          <div className="py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-body-sm transition-colors ${
                  pathname === item.href
                    ? 'text-brand-primary'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/catalogue-access"
              className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-body-sm text-white bg-brand-primary hover:bg-brand-primary-dark transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Access Catalogue
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 