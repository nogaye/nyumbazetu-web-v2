/**
 * Sign-in-only layout: full-width relative shell so the Ankara layer can use absolute
 * inset-0 across the whole savannah area (not only the card). Form sits at z-10.
 */

import type { ReactNode } from "react";
import { AuthAnkaraSubtleLayer } from "@/components/auth/auth-ankara-subtle-layer";

/**
 * Wraps sign-in content in a min-height viewport stack: textile layer then form.
 *
 * @param props.children — Sign-in page or Suspense fallback.
 * @returns Single root div for predictable layout stacking.
 */
export default function SignInLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="relative flex min-h-screen w-full max-w-none flex-col items-center justify-center">
      <AuthAnkaraSubtleLayer />
      <div className="relative z-10 flex w-full justify-center">{children}</div>
    </div>
  );
}
