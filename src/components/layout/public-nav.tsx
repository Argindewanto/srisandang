'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
  const pathname = usePathname();

  return (
    <header className="bg-white">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-brand-primary">
              SriSandang
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
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-body-sm transition-colors ${
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
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-body-sm text-white bg-brand-primary hover:bg-brand-primary-dark transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Access Catalogue
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 