'use client';

export default function CustomClothingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-display-lg text-neutral-900 mb-6">
              Custom Clothing Solutions
            </h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              Professional uniforms and custom clothing for your business. Quality materials, expert craftsmanship.
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
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-h3 text-neutral-900 mb-4">Quality Materials</h3>
              <p className="text-body-sm text-neutral-600">
                Premium fabrics and materials sourced from trusted suppliers.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-h3 text-neutral-900 mb-4">Expert Tailoring</h3>
              <p className="text-body-sm text-neutral-600">
                Skilled craftsmen with years of experience in uniform manufacturing.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-h3 text-neutral-900 mb-4">Custom Design</h3>
              <p className="text-body-sm text-neutral-600">
                Tailored solutions to match your brand identity and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h2 text-neutral-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-body-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your custom clothing needs or request access to our full catalogue.
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