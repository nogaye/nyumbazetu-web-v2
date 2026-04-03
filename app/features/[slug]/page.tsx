import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { FeatureViewTracker } from "@/components/feature-view-tracker";
import {
  getFeatureBySlug,
  getFeatureDetailImage,
} from "@/lib/features";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return { title: "Feature Not Found" };

  return {
    title: `${feature.title} | Nyumba Zetu`,
    description: feature.description,
  };
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature || !feature.what) {
    notFound();
  }

  return (
    <>
      <FeatureViewTracker featureSlug={slug} />
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24 pb-3 md:pb-4 lg:pb-5">
        <SectionHeader
          title={feature.title}
          description={feature.description}
        />
      </Section>

      {/* Feature hero image (Kenyan-context, photorealistic, relevant to this feature) */}
      <Section>
        <div className="max-w-5xl mx-auto mb-12">
          <div className="aspect-video relative rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-900">
            <Image
              src={getFeatureDetailImage(slug)}
              alt={`${feature.title} — Kenyan property management`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">What It Is</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{feature.what}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">How It Works</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{feature.how}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Why It Matters</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{feature.why}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Common questions about this feature."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {(feature.faqs ?? []).map((faq, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to see this feature in action?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Schedule a demo to explore how this feature can help your property operations.
          </p>
          <Button size="lg" asChild>
            <Link href="/request-demo" className="flex items-center gap-2">
              Request a Demo
              <CalendarDaysIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}


