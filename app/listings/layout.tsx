/**
 * Listings section layout: AuthProvider lives in LayoutShell around ListingsHeader + main
 * so the header and portal routes share one context; marketing routes skip that cost.
 */

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
