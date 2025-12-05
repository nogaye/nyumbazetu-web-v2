export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nyumba Zetu",
    url: "https://nyumbazetu.com",
    logo: "https://nyumbazetu.com/logo.png",
    description: "Property Management Infrastructure for Modern Kenyan Real Estate",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
      addressLocality: "Nairobi",
    },
    sameAs: [
      // Add social media links when available
      // "https://twitter.com/nyumbazetu",
      // "https://linkedin.com/company/nyumbazetu",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@nyumbazetu.com",
      areaServed: "KE",
      availableLanguage: ["en"],
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nyumba Zetu",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
    },
    description: "Full-stack property, accounting, and tenant experience platform built for landlords, property managers, committees, developers, and banks in Kenya.",
    featureList: [
      "Rent & Service Charge Collections",
      "Accounting & General Ledger",
      "Tenant & Owner Experience",
      "Maintenance & Assets",
      "KRA eTIMS Integration",
      "M-Pesa Integration",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
    </>
  );
}

