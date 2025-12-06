import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";

interface LegacyRequestDemoProps {
  dark?: boolean;
}

export function LegacyRequestDemo({ dark = true }: LegacyRequestDemoProps) {
  return (
    <Section
      className={`py-5 position-relative overflow-hidden ${
        dark ? "bg-slate-900 dark:bg-slate-950" : ""
      }`}
    >
      <div className="container mx-auto px-4 position-relative">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full lg:w-2/3 md:w-2/3 mx-auto text-left">
            <h5
              className={`mb-0 md:mb-5 text-lg md:text-xl ${
                dark ? "text-white" : "text-slate-900 dark:text-slate-50"
              }`}
            >
              Technology is quietly reshaping property management. Very soon a software-driven approach will be the expectations of your tenants. The question is whether to adapt early or play catch-up with your competitors.
            </h5>
          </div>
          <div className="w-full lg:w-1/3 mx-auto text-center">
            <Button size="lg" className="w-full md:w-auto">
              Request a Demo
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

