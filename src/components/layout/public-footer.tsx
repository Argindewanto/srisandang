import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Logo className="h-8 w-auto mb-4" />
            <h3 className="text-body-lg font-medium text-neutral-900 mb-2">
              CV. SRISANDANG PRIMA INDONESIA
            </h3>
            <p className="text-body-sm text-neutral-600">
              Perumahan Griya Yasa blok F62 Gentan, Baki, Sukoharjo, Jawa Tengah 57556
            </p>
          </div>

          {/* Main Menu */}
          <div>
            <h4 className="text-body-lg font-medium text-neutral-900 mb-4">
              Main Menu
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/custom-clothing"
                  className="text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Custom Clothing
                </Link>
              </li>
              <li>
                <Link 
                  href="/safety-wear"
                  className="text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Safety Wear
                </Link>
              </li>
              <li>
                <Link 
                  href="/profile"
                  className="text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Company Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="/articles"
                  className="text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-body-lg font-medium text-neutral-900 mb-4">
              Contact Info
            </h4>
            <div className="space-y-4">
              <a 
                href="https://api.whatsapp.com/send/?phone=6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
              <a 
                href="https://www.instagram.com/srisandang/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/srisandangprima"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-center text-body-sm text-neutral-600">
            All rights reserved. Various trademarks held by their respective owners.
          </p>
          <p className="text-center text-body-sm text-neutral-600 mt-1">
            ©2025 CV. SRISANDANG PRIMA INDONESIA
          </p>
        </div>
      </div>
    </footer>
  );
} 