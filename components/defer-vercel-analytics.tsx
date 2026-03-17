"use client";

/**
 * Loads @vercel/analytics after mount so the main thread stays free during LCP/TBT (lab PSI).
 */

import type { ComponentType } from "react";
import { useEffect, useState } from "react";

export function DeferVercelAnalytics() {
  const [AnalyticsComponent, setAnalyticsComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    void import("@vercel/analytics/react").then((m) => {
      setAnalyticsComponent(() => m.Analytics);
    });
  }, []);

  if (!AnalyticsComponent) return null;
  return <AnalyticsComponent />;
}
