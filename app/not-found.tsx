import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#b98036] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Page not found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">
              <HomeIcon className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              Contact Support
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Popular pages:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/product" className="text-sm text-[#b98036] hover:underline">
              Product
            </Link>
            <Link href="/features" className="text-sm text-[#b98036] hover:underline">
              Features
            </Link>
            <Link href="/solutions" className="text-sm text-[#b98036] hover:underline">
              Solutions
            </Link>
            <Link href="/pricing" className="text-sm text-[#b98036] hover:underline">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

