"use client";

import { useEffect } from "react";
import { trackFeatureView } from "@/lib/analytics";

export function FeatureViewTracker({ featureSlug }: { featureSlug: string }) {
  useEffect(() => {
    trackFeatureView(featureSlug);
  }, [featureSlug]);

  return null;
}

