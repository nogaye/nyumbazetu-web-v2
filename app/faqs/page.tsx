"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface FAQItem {
  id: number;
  title: string;
  description: string;
}

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const items: FAQItem[] = [
    {
      id: 1,
      title: "What is Nyumba Zetu?",
      description:
        "Nyumba Zetu is a cloud-based software designed for landlords and property managers. It streamlines property management including listings, invoicing, maintenance, and reporting.",
    },
    {
      id: 2,
      title: "How does Nyumba Zetu work?",
      description:
        "Nyumba Zetu, a property management software, aids in managing properties and tenants. It facilitates tracking rent payments, maintenance requests, and lease renewals.",
    },
    {
      id: 3,
      title: "What features does Nyumba Zetu offer for Tenant Management?",
      description:
        "Nyumba Zetu allows comprehensive tenant management. Users can add tenants, track rent, handle maintenance requests, and screen potential tenants efficiently.",
    },
    {
      id: 4,
      title: "How does Nyumba Zetu assist in Property Management?",
      description:
        "The platform aids in scheduling maintenance, tracking expenses, and handling lease renewals. It also provides detailed property reports for effective management.",
    },
    {
      id: 5,
      title: "Is Nyumba Zetu user-friendly?",
      description:
        "Designed for ease of use, Nyumba Zetu has an intuitive interface, requiring no special training. It also offers excellent customer support for any assistance needed.",
    },
    {
      id: 6,
      title: "What are the benefits of using Nyumba Zetu?",
      description:
        "Benefits include efficient property management, increased tenant satisfaction, and automated rent collection, streamlining the management process.",
    },
    {
      id: 7,
      title: "What types of properties can be managed with Nyumba Zetu?",
      description:
        "Nyumba Zetu is versatile, managing both residential (apartments, townhouses, homes) and commercial properties (office buildings, retail spaces).",
    },
    {
      id: 8,
      title: "How do I onboard new properties to Nyumba Zetu?",
      description:
        "Onboarding is quick and easy, with options for self-onboarding or assisted onboarding by the Nyumba Zetu team, ensuring a hassle-free setup.",
    },
    {
      id: 9,
      title: "Does Nyumba Zetu enhance tenant satisfaction?",
      description:
        "Yes, through a tenant portal, prompt maintenance response, and regular communication, Nyumba Zetu strives to maximize tenant satisfaction.",
    },
    {
      id: 10,
      title: "How are maintenance requests handled by Nyumba Zetu?",
      description:
        "Tenants submit requests via the app or portal, with property managers scheduling and updating the status, ensuring efficient maintenance management.",
    },
    {
      id: 11,
      title: "Is data secure with Nyumba Zetu?",
      description:
        "Data security is a priority. Nyumba Zetu uses encryption and advanced security measures to protect user information.",
    },
    {
      id: 12,
      title: "Does Nyumba Zetu offer account reconciliations for property managers?",
      description:
        "The software provides account reconciliation capabilities, integrating with multiple payment channels for efficient financial management.",
    },
    {
      id: 13,
      title: "How does Nyumba Zetu support landlords with empty apartments?",
      description:
        "Nyumba Zetu helps fill vacancies by listing empty apartments on platforms like Buy Rent Kenya, increasing visibility and tenant acquisition.",
    },
    {
      id: 14,
      title: "How does Nyumba Zetu address rent payment issues?",
      description:
        "With the Nyumba Zetu Wallet feature and thorough tenant screening, the software minimizes late or missed rent payments.",
    },
    {
      id: 15,
      title: "What is Nyumba Zetu's approach to tenant screening?",
      description:
        "The software conducts comprehensive tenant screenings, including background checks and rental history verification, to ensure reliable tenants.",
    },
    {
      id: 16,
      title: "How does Nyumba Zetu cater to multiple properties with different payment methods?",
      description:
        "Nyumba Zetu offers a streamlined dashboard for managing multiple properties, each with its unique integrated payment method.",
    },
    {
      id: 17,
      title: "Does Nyumba Zetu enhance brand visibility?",
      description:
        "Yes, it supports brand visibility by featuring your company's logo in communications and offering custom domain solutions. We recognize the importance of your brand and the dedication you have put in to establish it. As your technology partner, we strive to support your brand by ensuring that all communication with your clients carries your company's name and logo, prominently displaying your brand identity. Furthermore, we provide custom domain solutions to enhance the visibility of your brand, allowing it to stand out and make a lasting impression on your clients.",
    },
    {
      id: 18,
      title: "Can Nyumba Zetu be customized for specific business needs?",
      description:
        "Nyumba Zetu offers customization options, including lease templates, custom reports, and automated workflows to suit unique business requirements.",
    },
    {
      id: 19,
      title: "What customer support options are available with Nyumba Zetu?",
      description:
        "Customer support is available via phone, email, and live chat, ensuring prompt assistance for any issues or inquiries.",
    },
    {
      id: 20,
      title: "What is the pricing structure for Nyumba Zetu?",
      description:
        "Nyumba Zetu offers various pricing options based on the number of units managed and the required service level. Contact their sales team for details.",
    },
    {
      id: 21,
      title: "How can I sign up for Nyumba Zetu?",
      description:
        "Signing up is quick and straightforward. Visit the Nyumba Zetu website and follow the prompts to create an account in under three minutes.",
    },
  ];

  const additionalFAQs = [
    {
      id: 22,
      title: "How do I onboard?",
      description:
        "Our onboarding process is designed to be quick and efficient, taking less than 20 minutes to complete when all the necessary records are available. To get started, you have the option to do a self-onboarding where you can easily log in and enter all your information yourself. Alternatively, we can also take care of the onboarding process for you at no additional cost. We understand the importance of a smooth onboarding experience, and we strive to provide you with the flexibility and convenience you need to get started quickly and easily.",
    },
    {
      id: 23,
      title: "Is my data safe?",
      description:
        "Yes, we take data security seriously. Safeguarding your data is of utmost importance to us. To ensure the highest level of security, we utilize encryption and other advanced security measures to protect your valuable information.",
    },
    {
      id: 24,
      title: "Do you provide support?",
      description:
        "Absolutely! Our support team is available to assist you through multiple channels, including email, chat, and phone call.",
    },
    {
      id: 25,
      title: "Can I customize the software to meet my specific needs?",
      description:
        "As a property management system, we understand that each business has its unique requirements. To cater to this, we provide customizable options that can be tailored to your specific needs. This includes the ability to customize lease templates, generate custom reports, and configure automated workflows, ensuring that our system works seamlessly with your business operations.",
    },
    {
      id: 26,
      title: "Is it easy to use for a non-technical person?",
      description:
        "Our system is designed to be intuitive and user-friendly, making it easy for property managers and tenants to navigate. We understand that not everyone is a tech expert, so we've ensured that our system is easy to use, even for those with limited technical skills. Moreover, we offer comprehensive training and support services to help you get started with the system and answer any questions or concerns you may have.",
    },
    {
      id: 27,
      title: "How do tenants pay for rent?",
      description:
        "To provide you with the utmost convenience, we have integrated our system with multiple banks and Mpesa for a seamless payment process. Additionally, we have developed a WhatsApp chatbot that enables your tenants to check their bills and make payments directly from the messaging app, without having to contact you. This makes the payment process even more convenient for them.",
    },
  ];

  const allFAQs = [...items, ...additionalFAQs];

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Some frequently asked questions"
        />
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <h4 className="my-4 ps-3 text-xl font-semibold text-slate-900 dark:text-slate-50">
            Basics
          </h4>

          <div className="space-y-3">
            {allFAQs.map((item) => {
              const isOpen = openItems.has(item.id);
              return (
                <Card key={item.id} className="mb-3">
                  <button
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                  >
                    <h5 className="font-bold text-slate-900 dark:text-slate-50 pr-4">
                      {item.title}
                    </h5>
                    <ChevronDownIcon
                      className={`h-5 w-5 text-primary transition-transform flex-shrink-0 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <CardContent className="pt-0 pb-4 px-4">
                      <p className="text-dark dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}


