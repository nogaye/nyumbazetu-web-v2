/**
 * Canonical external resource URLs and labels for Nyumba Zetu.
 * Used by footer, main nav, and any other surfaces that link to status or docs.
 */

export const EXTERNAL_RESOURCES = {
  status: {
    label: "System Status",
    href: "https://status.nyumbazetu.com/",
    description: "Check platform uptime and incidents",
  },
  docs: {
    label: "Documentation",
    href: "https://docs.nyumbazetu.com/",
    description: "Browse guides, tutorials, and help resources",
  },
} as const;
