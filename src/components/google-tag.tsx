'use client';

import Script from 'next/script';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Conversion IDs with the actual IDs from Google Ads
const CONVERSION_IDS = {
  LEAD: 'AW-16753332520/WG1fCMqq3_EZEKiizrQ-',
  CONTACT: 'AW-16753332520/FmFYCNa30PEZEKiizrQ-',
};

// Helper function to track conversions
export const trackConversion = (conversionId: string, options?: {
  value?: number;
  currency?: string;
  callback?: () => void;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': conversionId,
      ...(options?.value && { 'value': options.value }),
      ...(options?.currency && { 'currency': options.currency }),
      ...(options?.callback && { 'event_callback': options.callback }),
    });
  }
};

// Helper function for WhatsApp contact conversion
export const trackWhatsAppConversion = (url?: string) => {
  const callback = () => {
    if (typeof url !== 'undefined') {
      window.location.href = url;
    }
  };

  trackConversion(CONVERSION_IDS.CONTACT, {
    value: 300000.0,
    currency: 'IDR',
    callback
  });

  return false;
};

// Helper function for lead form conversion
export const trackLeadFormConversion = (callback?: () => void) => {
  trackConversion(CONVERSION_IDS.LEAD, {
    callback
  });
};

export default function GoogleTag() {
  return (
    <>
      {/* Google Ads Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16753332520"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-16753332520');
        `}
      </Script>
    </>
  );
} 