import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";

export function LegacyPortfolio() {
  return (
    <Section className="bg-slate-900 dark:bg-slate-950 py-5 position-relative overflow-hidden">
      <div className="container mx-auto px-4 position-relative">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 text-center">
            <span className="badge bg-primary text-white mb-2 px-3 py-1 rounded-full">
              <strong>Manage your portfolio on one platform</strong>
            </span>
            <h2 className="text-white text-2xl md:text-3xl font-bold mt-4">
              Easily manage your properties from anywhere
            </h2>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
                <b>Residential</b>
              </Button>
              <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
                <b>Commercial</b>
              </Button>
              <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
                <b>Student Housing</b>
              </Button>
              <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
                <b>Affordable Housing</b>
              </Button>
              <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
                <b>Community Associations</b>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
            <p className="text-white mt-5 text-lg leading-relaxed">
              Automate rent collection, effortlessly send invoices and announcements to tenants, pay your employees and vendors, manage maintenance requests, securely store files, and generate reports for unparalleled organization like never before.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

