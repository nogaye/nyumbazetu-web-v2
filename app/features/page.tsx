/**
 * Features index page. Renders the consolidated FeatureGrid with all product features
 * and a CTA section. Uses the shared feature list from feature-grid.tsx.
 */
import { FeatureGrid } from "@/components/home/feature-grid";

export const metadata = {
  title: "Property Management Features | Nyumba Zetu",
  description:
    "Comprehensive property management features including rent collection, accounting, tenant experience, maintenance, and more.",
};

export default function FeaturesPage() {
  return (
    <>
      <FeatureGrid
        title="Complete Property Management Platform"
        description="Everything you need to manage properties, accounting, and tenant relationships in one integrated platform."
        showCta
      />
    </>
  );
}
