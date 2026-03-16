/**
 * Listings section layout: no extra wrapper; the root LayoutShell already renders
 * ListingsHeader + ListingsFooter for /listings/**. This layout only wraps children
 * so nested routes (portal, search, etc.) share the same shell.
 */

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
