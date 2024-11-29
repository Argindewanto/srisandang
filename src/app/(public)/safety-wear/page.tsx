'use client';

export default function SafetyWearPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-display-lg text-neutral-900 mb-6">
              Safety Wear Solutions
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              High-quality safety equipment and workwear for your business. Compliant with industry standards and regulations.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors"
              >
                Contact via WhatsApp
              </a>
              <a
                href="/catalogue-access"
                className="px-6 py-3 border border-neutral-200 text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors"
              >
                View Catalogue
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-h1 text-neutral-900 text-center mb-16">
            Our Safety Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-h3 text-neutral-900 mb-4">Industry Compliant</h3>
              <p className="text-body-sm text-neutral-600">
                All safety wear meets or exceeds industry safety standards and regulations.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-h3 text-neutral-900 mb-4">Durable Materials</h3>
              <p className="text-body-sm text-neutral-600">
                High-quality, long-lasting materials designed for demanding work environments.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-h3 text-neutral-900 mb-4">Customization</h3>
              <p className="text-body-sm text-neutral-600">
                Custom branding and modifications available for all safety equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h2 text-neutral-900 mb-4">
            Protect Your Team
          </h2>
          <p className="text-body-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your safety wear requirements or request access to our complete catalogue.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark transition-colors"
            >
              Contact via WhatsApp
            </a>
            <a
              href="/catalogue-access"
              className="px-6 py-3 border border-neutral-200 text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors"
            >
              View Catalogue
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 