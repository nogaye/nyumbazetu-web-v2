import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata = {
  title: "Events & Gallery - Nyumba Zetu",
  description: "Upcoming events and gallery from Nyumba Zetu",
};

export default function EventsPage() {
  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url(/legacy/images/events/bg33.jpg)" }}
        />
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex">
              <div className="w-full lg:w-2/3 text-left">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                  Events & Gallery
                </h1>
                <p className="text-lg text-white text-left md:pe-5 mt-4">
                  We are always looking for new real-estate related events. If you have an event you would like us to participate please contact us.
                </p>
                <div className="mt-6">
                  <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
                    <a href="/contact">Contact Us</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Check back soon for upcoming events and our event gallery.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}


