import { redirect } from "next/navigation";

/**
 * Admin Layout
 * 
 * TODO: Add authentication check here
 * Example:
 * 
 * import { getServerSession } from "next-auth";
 * 
 * export default async function AdminLayout({ children }) {
 *   const session = await getServerSession();
 *   
 *   if (!session || !session.user.isAdmin) {
 *     redirect("/");
 *   }
 *   
 *   return <>{children}</>;
 * }
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication check
  // For now, this is accessible to anyone
  // In production, add proper authentication

  return (
    <div className="min-h-screen">
      {/* Admin Navigation */}
      <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                Admin Panel
              </h2>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
              <a
                href="/admin/inquiries"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
              >
                Inquiries
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ⚠️ Add authentication
              </span>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}

