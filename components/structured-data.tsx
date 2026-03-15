/**
 * Structured data (JSON-LD) for the marketing site. Exports StructuredData component
 * used in the root layout for Organization and SoftwareApplication schemas.
 */
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_PRIMARY,
} from "@/lib/constants/contact";

/**
 * Renders JSON-LD structured data for the site: Organization (with contact point)
 * and SoftwareApplication schemas for SEO and rich results.
 */
export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nyumba Zetu",
    url: "https://nyumbazetu.com",
    logo: "https://nyumbazetu.com/logo.svg",
    description: "Property Management Infrastructure for Modern Kenyan Real Estate",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
      addressLocality: "Nairobi",
    },
    sameAs: [
      "https://www.facebook.com/nyumbazetu.ke/",
      "https://www.twitter.com/nyumbazetu/",
      "https://www.instagram.com/nyumbazetu/",
      "https://www.linkedin.com/company/nyumba-zetu/",
      "https://www.youtube.com/@nyumbazetu/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_PRIMARY,
      areaServed: "KE",
      availableLanguage: ["en"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
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
      "Maintenance and Service Requests",
      "Assets Management",
      "Expense & Vendor Management",
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

