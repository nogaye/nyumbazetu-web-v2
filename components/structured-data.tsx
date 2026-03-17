/**
 * Structured data (JSON-LD) for the marketing site. Exports StructuredData component
 * used in the root layout for Organization, SoftwareApplication, FAQPage, and
 * AggregateRating schemas to improve SEO and rich search results.
 */
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_PRIMARY,
} from "@/lib/constants/contact";

/** Key FAQs for FAQPage schema (subset of site FAQs). */
const FAQ_ITEMS = [
  {
    question: "What is Nyumba Zetu?",
    answer: "Nyumba Zetu is Kenya's leading cloud-based property management software for landlords and property managers. It streamlines rent collection via M-Pesa, tenant management, maintenance, accounting, and KRA eTIMS compliance.",
  },
  {
    question: "How does rent collection work with M-Pesa?",
    answer: "Nyumba Zetu integrates with M-Pesa and banks so tenants can pay rent directly. Payments are automatically matched and reconciled; you get real-time visibility and no manual tracking.",
  },
  {
    question: "Is Nyumba Zetu suitable for HOAs and estate committees?",
    answer: "Yes. Nyumba Zetu offers service charge management, committee workflows, resident communication, and audit-ready financial records for housing estates and homeowners associations in Kenya.",
  },
  {
    question: "What types of properties can I manage?",
    answer: "Nyumba Zetu supports residential and commercial properties—apartments, townhouses, estates, and mixed-use. It scales from a single unit to hundreds of properties.",
  },
  {
    question: "How do I get started with Nyumba Zetu?",
    answer: "Sign up on our website; onboarding takes under 20 minutes. We offer self-onboarding or assisted onboarding at no extra cost. Contact our team for a demo.",
  },
];

/**
 * Renders JSON-LD structured data for the site: Organization (with contact point),
 * SoftwareApplication, FAQPage, and AggregateRating schemas for SEO and rich results.
 */
export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nyumba Zetu",
    url: "https://www.nyumbazetu.com",
    logo: "https://www.nyumbazetu.com/logo.svg",
    description: "Kenya's leading property management software: rent collection, accounting, tenant management, and compliance.",
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
    url: "https://www.nyumbazetu.com",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
    },
    description: "Kenya's leading property management software: rent collection via M-Pesa, accounting, tenant management, and compliance for landlords, property managers, committees, developers, and banks.",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      ratingCount: "500",
      worstRating: "1",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

