'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/lib/firebase/products';
import { WhatsAppButton } from '@/components/ui/buttons';
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        {/* Hidden DialogTitle for accessibility */}
        <DialogTitle className="sr-only">
          {product.name}
        </DialogTitle>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section - 4:5 aspect ratio */}
          <div className="relative w-full lg:w-1/2 aspect-[4/5]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 p-6 lg:p-8">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-body-sm text-neutral-900 mb-4">
              {product.category === 'clothing' ? 'Regular' : 'Safety'}
            </span>

            {/* Product Name */}
            <h2 className="text-h2 text-neutral-900 mb-4">
              {product.name}
            </h2>

            {/* Description */}
            <p className="text-body-lg text-neutral-600 mb-8">
              {product.description}
            </p>

            {/* WhatsApp Button */}
            <WhatsAppButton 
              className="w-full"
              message={`Halo, saya tertarik dengan produk ${product.name}. Boleh minta informasi lebih lanjut?`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 