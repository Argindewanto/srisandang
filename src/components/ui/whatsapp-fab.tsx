'use client';

import { MessageCircle } from 'lucide-react';
import { trackWhatsAppConversion } from '@/components/google-tag';

export function WhatsAppFAB() {
  const defaultMessage = "Halo, saya tertarik dengan produk Srisandang";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/6281228747959?text=${encodedMessage}`;

  const handleClick = () => {
    // Track Meta Pixel Contact event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: 'WhatsApp FAB',
        content_category: 'Contact',
        content_type: 'WhatsApp',
      });
    }

    // Track Google Ads Contact conversion
    trackWhatsAppConversion(whatsappUrl);
  };

  return (
    <a
      href={whatsappUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
} 