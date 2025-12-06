/**
 * Analytics and event tracking utilities
 * 
 * This module provides a centralized way to track user interactions
 * and events across the application. It supports multiple analytics
 * providers and can be easily extended.
 */

// Analytics event types
export type AnalyticsEvent = 
  | { type: 'page_view'; path: string; title?: string }
  | { type: 'button_click'; label: string; location: string; href?: string }
  | { type: 'form_submit'; formName: string; success: boolean }
  | { type: 'link_click'; text: string; href: string; location: string }
  | { type: 'feature_view'; feature: string }
  | { type: 'solution_view'; solution: string }
  | { type: 'cta_click'; ctaText: string; location: string; destination: string };

// Analytics provider interface
interface AnalyticsProvider {
  trackEvent(event: AnalyticsEvent): void;
  trackPageView(path: string, title?: string): void;
}

// Google Analytics 4 implementation
class GoogleAnalyticsProvider implements AnalyticsProvider {
  private measurementId: string | null = null;

  constructor(measurementId?: string) {
    this.measurementId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null;
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !this.measurementId) return;

    // GA4 event structure
    const gaEvent: Record<string, any> = {
      event: this.mapEventType(event.type),
    };

    // Add event-specific parameters
    switch (event.type) {
      case 'button_click':
        gaEvent.button_label = event.label;
        gaEvent.button_location = event.location;
        if (event.href) gaEvent.button_destination = event.href;
        break;
      case 'form_submit':
        gaEvent.form_name = event.formName;
        gaEvent.form_success = event.success;
        break;
      case 'link_click':
        gaEvent.link_text = event.text;
        gaEvent.link_url = event.href;
        gaEvent.link_location = event.location;
        break;
      case 'feature_view':
        gaEvent.feature_name = event.feature;
        break;
      case 'solution_view':
        gaEvent.solution_name = event.solution;
        break;
      case 'cta_click':
        gaEvent.cta_text = event.ctaText;
        gaEvent.cta_location = event.location;
        gaEvent.cta_destination = event.destination;
        break;
    }

    // Send to GA4
    if (window.gtag) {
      window.gtag('event', gaEvent.event, gaEvent);
    }
  }

  trackPageView(path: string, title?: string): void {
    if (typeof window === 'undefined' || !this.measurementId) return;

    if (window.gtag) {
      window.gtag('config', this.measurementId, {
        page_path: path,
        page_title: title,
      });
    }
  }

  private mapEventType(type: string): string {
    const eventMap: Record<string, string> = {
      page_view: 'page_view',
      button_click: 'button_click',
      form_submit: 'form_submit',
      link_click: 'link_click',
      feature_view: 'feature_view',
      solution_view: 'solution_view',
      cta_click: 'cta_click',
    };
    return eventMap[type] || 'custom_event';
  }
}

// Plausible Analytics implementation
class PlausibleProvider implements AnalyticsProvider {
  private domain: string | null = null;

  constructor(domain?: string) {
    this.domain = domain || process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || null;
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window === 'undefined' || !this.domain) return;

    const eventName = this.mapEventType(event.type);
    const props: Record<string, string> = {};

    // Add event-specific properties
    switch (event.type) {
      case 'button_click':
        props.label = event.label;
        props.location = event.location;
        break;
      case 'form_submit':
        props.form = event.formName;
        props.success = event.success.toString();
        break;
      case 'link_click':
        props.text = event.text;
        props.href = event.href;
        break;
      case 'feature_view':
        props.feature = event.feature;
        break;
      case 'solution_view':
        props.solution = event.solution;
        break;
    }

    if (window.plausible) {
      window.plausible(eventName, { props });
    }
  }

  trackPageView(path: string, title?: string): void {
    // Plausible automatically tracks page views
    // This is here for consistency with the interface
  }

  private mapEventType(type: string): string {
    return type;
  }
}

// Main analytics class
class Analytics {
  private providers: AnalyticsProvider[] = [];

  constructor() {
    // Initialize providers based on environment variables
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      this.providers.push(new GoogleAnalyticsProvider());
    }
    if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
      this.providers.push(new PlausibleProvider());
    }
  }

  trackEvent(event: AnalyticsEvent): void {
    this.providers.forEach(provider => provider.trackEvent(event));
  }

  trackPageView(path: string, title?: string): void {
    this.providers.forEach(provider => provider.trackPageView(path, title));
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Helper functions for common tracking scenarios
export const trackButtonClick = (label: string, location: string, href?: string) => {
  analytics.trackEvent({ type: 'button_click', label, location, href });
};

export const trackFormSubmit = (formName: string, success: boolean) => {
  analytics.trackEvent({ type: 'form_submit', formName, success });
};

export const trackLinkClick = (text: string, href: string, location: string) => {
  analytics.trackEvent({ type: 'link_click', text, href, location });
};

export const trackFeatureView = (feature: string) => {
  analytics.trackEvent({ type: 'feature_view', feature });
};

export const trackSolutionView = (solution: string) => {
  analytics.trackEvent({ type: 'solution_view', solution });
};

export const trackCTAClick = (ctaText: string, location: string, destination: string) => {
  analytics.trackEvent({ type: 'cta_click', ctaText, location, destination });
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

