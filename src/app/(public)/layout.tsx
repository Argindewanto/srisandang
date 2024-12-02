import { PublicNav } from '@/components/layout/public-nav';
import { PublicFooter } from '@/components/layout/public-footer';
import { WhatsAppFAB } from '@/components/ui/whatsapp-fab';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav />
      <div className="pt-16">
        {children}
      </div>
      <PublicFooter />
      <WhatsAppFAB />
    </>
  );
} 