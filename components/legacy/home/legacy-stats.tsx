import { Section } from "@/components/section";
import Image from "next/image";

export function LegacyStats() {
  return (
    <Section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-2/5 lg:w-1/3 mb-4 md:mb-0">
              <Image
                src="/legacy/images/home/nyumbazetu_app.png"
                alt="Nyumba Zetu App"
                width={350}
                height={350}
                className="w-full rounded-lg object-contain"
                style={{ maxWidth: "350px" }}
                sizes="(max-width: 768px) 100vw, 350px"
                loading="lazy"
              />
          </div>
          <div className="w-full md:w-3/5 lg:w-2/3">
            <h3 className="text-slate-900 dark:text-slate-50 mb-4 text-2xl font-bold">
              Built on transparency and accountability
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3 text-lg">
              Our system simplifies invoicing and payments with seamless integration of multiple channels, including local banks. You can easily check your bills and make payments using our App or WhatsApp chatbot.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-0 text-lg">
              No more payment screenshots, Excel headaches, or paperwork nightmares.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

