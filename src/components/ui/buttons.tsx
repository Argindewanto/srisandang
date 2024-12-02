import { AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

interface WhatsAppButtonProps extends ButtonProps {
  message?: string;
}

export function WhatsAppButton({ className, message, ...props }: WhatsAppButtonProps) {
  const defaultMessage = "Halo, saya tertarik dengan produk Srisandang";
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  const whatsappUrl = `https://wa.me/6281228747959?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors",
        className
      )}
      {...props}
    >
      WhatsApp Kami
    </a>
  );
}

export function CatalogueButton({ className, ...props }: ButtonProps) {
  return (
    <a
      href="/catalogue-access"
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 bg-white text-neutral-900 rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors",
        className
      )}
      {...props}
    >
      Lihat Katalog
    </a>
  );
} 