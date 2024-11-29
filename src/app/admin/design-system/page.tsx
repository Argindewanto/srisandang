'use client';

import { WhatsAppButton, CatalogueButton } from '@/components/ui/buttons';
import { CTA } from '@/components/ui/cta';

export default function DesignSystem() {
  return (
    <div className="min-h-screen p-8 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-8 text-neutral-900">Design System</h1>
        
        {/* Colors Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl mb-6 text-neutral-900">Colors</h2>
          <div className="space-y-8">
            {/* Brand Colors */}
            <div>
              <h3 className="text-sm text-neutral-600 mb-4">Brand Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 w-full bg-brand-primary rounded-md"></div>
                  <p className="text-sm text-neutral-900">Primary</p>
                  <code className="text-xs text-neutral-500">#00CF61</code>
                </div>
                <div className="space-y-2">
                  <div className="h-20 w-full bg-brand-primary-dark rounded-md"></div>
                  <p className="text-sm text-neutral-900">Primary Dark</p>
                  <code className="text-xs text-neutral-500">#00B954</code>
                </div>
              </div>
            </div>

            {/* Neutral Colors */}
            <div>
              <h3 className="text-sm text-neutral-600 mb-4">Neutral Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <div className="h-20 w-full bg-neutral-900 rounded-md"></div>
                  <p className="text-sm text-neutral-900">Neutral 900</p>
                  <code className="text-xs text-neutral-500">text-neutral-900</code>
                </div>
                <div className="space-y-2">
                  <div className="h-20 w-full bg-neutral-700 rounded-md"></div>
                  <p className="text-sm text-neutral-900">Neutral 700</p>
                  <code className="text-xs text-neutral-500">text-neutral-700</code>
                </div>
                <div className="space-y-2">
                  <div className="h-20 w-full bg-neutral-500 rounded-md"></div>
                  <p className="text-sm text-neutral-900">Neutral 500</p>
                  <code className="text-xs text-neutral-500">text-neutral-500</code>
                </div>
                <div className="space-y-2">
                  <div className="h-20 w-full bg-neutral-300 rounded-md"></div>
                  <p className="text-sm text-neutral-900">Neutral 300</p>
                  <code className="text-xs text-neutral-500">text-neutral-300</code>
                </div>
                <div className="space-y-2">
                  <div className="h-20 w-full bg-neutral-100 rounded-md"></div>
                  <p className="text-sm text-neutral-900">Neutral 100</p>
                  <code className="text-xs text-neutral-500">text-neutral-100</code>
                </div>
                <div className="space-y-2">
                  <div className="h-20 w-full bg-neutral-50 rounded-md border border-neutral-200"></div>
                  <p className="text-sm text-neutral-900">Neutral 50</p>
                  <code className="text-xs text-neutral-500">text-neutral-50</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl mb-6 text-neutral-900">Typography</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm text-neutral-600 mb-4">Display</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[52px] leading-[56px] tracking-[-0.02em] text-neutral-900">Display Large</p>
                  <code className="text-xs text-neutral-500">text-[52px] leading-[56px] tracking-[-0.02em]</code>
                </div>
                <div>
                  <p className="text-[44px] leading-[48px] tracking-[-0.02em] text-neutral-900">Display Small</p>
                  <code className="text-xs text-neutral-500">text-[44px] leading-[48px] tracking-[-0.02em]</code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-neutral-600 mb-4">Headings</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[32px] leading-[40px] text-neutral-900">Heading 1</p>
                  <code className="text-xs text-neutral-500">text-[32px] leading-[40px]</code>
                </div>
                <div>
                  <p className="text-[24px] leading-[32px] text-neutral-900">Heading 2</p>
                  <code className="text-xs text-neutral-500">text-[24px] leading-[32px]</code>
                </div>
                <div>
                  <p className="text-[20px] leading-[28px] text-neutral-900">Heading 3</p>
                  <code className="text-xs text-neutral-500">text-[20px] leading-[28px]</code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-neutral-600 mb-4">Body</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[16px] leading-[24px] text-neutral-900">Body Large</p>
                  <code className="text-xs text-neutral-500">text-[16px] leading-[24px]</code>
                </div>
                <div>
                  <p className="text-[14px] leading-[20px] text-neutral-900">Body Small</p>
                  <code className="text-xs text-neutral-500">text-[14px] leading-[20px]</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="mb-12 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl mb-6 text-neutral-900">Components</h2>
          <div className="space-y-8">
            {/* Basic Buttons */}
            <div>
              <h3 className="text-sm text-neutral-600 mb-4">Basic Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors">
                  Primary Button
                </button>
                <button className="px-4 py-2 border border-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors">
                  Secondary Button
                </button>
                <button className="px-4 py-2 text-neutral-900 hover:bg-neutral-50 rounded-md transition-colors">
                  Text Button
                </button>
              </div>
            </div>

            {/* Custom Buttons */}
            <div>
              <h3 className="text-sm text-neutral-600 mb-4">Custom Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <WhatsAppButton />
                <CatalogueButton />
              </div>
            </div>

            {/* CTA Section */}
            <div>
              <h3 className="text-sm text-neutral-600 mb-4">CTA Component</h3>
              <div className="space-y-4">
                <CTA />
                <div className="mt-4">
                  <p className="text-sm text-neutral-500">
                    Usage:
                  </p>
                  <pre className="mt-2 p-4 bg-neutral-50 rounded-md overflow-x-auto">
                    <code className="text-sm">
                      {`import { CTA } from '@/components/ui/cta';

// Then in your component:
<CTA />`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 