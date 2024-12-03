'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/lib/firebase/products';
import { WhatsAppButton } from '@/components/ui/buttons';
import { X } from 'lucide-react';
import Image from 'next/image';

interface CatalogueProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function CatalogueProductModal({
  product,
  isOpen,
  onClose
}: CatalogueProductModalProps) {
  const descriptionParagraphs = product.description.split('\n\n');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden flex flex-col max-h-[calc(100vh-2rem)]">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
          <DialogTitle className="text-lg font-semibold text-neutral-900">
            {product.name}
          </DialogTitle>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section - 4:5 aspect ratio */}
            <div className="relative w-full lg:w-1/2 aspect-[4/5]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8">
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-body-sm text-neutral-900 mb-4">
                {product.category === 'clothing' ? 'Regular' : 'Safety'}
              </span>

              {/* Description - Updated to handle paragraphs */}
              <div className="text-body-lg text-neutral-600 mb-8 space-y-4">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* WhatsApp Button */}
              <WhatsAppButton 
                className="w-full mb-6"
                message={`Halo, saya tertarik dengan produk ${product.name}. Boleh minta informasi lebih lanjut?`}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 