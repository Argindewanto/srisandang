import { MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
}

export function WhatsAppButton({ className }: ButtonProps) {
  const openWhatsApp = () => {
    const message = encodeURIComponent('Hallo Admin Srisandang');
    window.open(`https://wa.me/628979279749?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className={`
        px-4 py-2 bg-neutral-900 hover:bg-neutral-500 
        text-white rounded-md transition-colors
        inline-flex items-center justify-center gap-2
        ${className}
      `}
    >
      <MessageCircle className="h-4 w-4" />
      <span>WhatsApp Admin</span>
    </button>
  );
}

export function CatalogueButton({ className }: ButtonProps) {
  return (
    <Link
      href="/catalogue-access"
      className={`
        px-4 py-2 border border-neutral-200 
        text-neutral-900 rounded-md 
        hover:bg-neutral-50 transition-colors
        inline-flex items-center justify-center gap-2
        ${className}
      `}
    >
      <span>Lihat Katalog</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
} 