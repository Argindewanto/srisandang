export function PublicFooter() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-brand-primary">SriSandang</h3>
            <p className="mt-4 text-body-sm text-neutral-600 max-w-md">
              Providing high-quality custom clothing and safety wear solutions for businesses across Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-body-lg font-medium text-neutral-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/custom-clothing" className="text-body-sm text-neutral-600 hover:text-neutral-900">
                  Custom Clothing
                </a>
              </li>
              <li>
                <a href="/safety-wear" className="text-body-sm text-neutral-600 hover:text-neutral-900">
                  Safety Wear
                </a>
              </li>
              <li>
                <a href="/profile" className="text-body-sm text-neutral-600 hover:text-neutral-900">
                  Company Profile
                </a>
              </li>
              <li>
                <a href="/articles" className="text-body-sm text-neutral-600 hover:text-neutral-900">
                  Articles
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-body-lg font-medium text-neutral-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-body-sm text-neutral-600 hover:text-neutral-900"
                >
                  WhatsApp: +62 812-3456-7890
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@srisandang.com"
                  className="text-body-sm text-neutral-600 hover:text-neutral-900"
                >
                  Email: info@srisandang.com
                </a>
              </li>
              <li className="text-body-sm text-neutral-600">
                Jl. Example Street No. 123<br />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-center text-body-sm text-neutral-600">
            © {new Date().getFullYear()} SriSandang. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 