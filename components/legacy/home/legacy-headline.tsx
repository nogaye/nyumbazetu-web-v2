import { Section } from "@/components/section";

export function LegacyHeadline() {
  return (
    <Section className="bg-slate-900 dark:bg-slate-950 py-4">
      <div className="container mx-auto px-4">
        <div className="flex text-center justify-center">
          <div className="w-full lg:w-1/2">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-3">
              Kenya&apos;s Leading Property Management Software for Landlords & Agents
            </h1>

            <p className="text-white lead text-lg">
              Nyumba Zetu © is a cloud based software built for developers, landlords and property managers to streamline every aspect of property management, from listings, invoicing, and bill payments to maintenance, expenses, and reporting.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

