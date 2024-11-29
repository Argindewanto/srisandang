import { WhatsAppButton, CatalogueButton } from '@/components/ui/buttons';

interface CTAProps {
  className?: string;
}

export function CTA({ className }: CTAProps) {
  return (
    <div 
      className={`
        flex flex-col sm:flex-row gap-4
        w-full sm:w-auto
        ${className}
      `}
    >
      <WhatsAppButton className="w-full sm:w-auto" />
      <CatalogueButton className="w-full sm:w-auto" />
    </div>
  );
} 