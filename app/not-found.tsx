import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Page not found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/" className="flex items-center gap-2">
              Go Home
              <HomeIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact" className="flex items-center gap-2">
              Contact Support
              <QuestionMarkCircleIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Popular pages:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/product" className="text-sm text-primary hover:underline">
              Product
            </Link>
            <Link href="/features" className="text-sm text-primary hover:underline">
              Features
            </Link>
            <Link href="/solutions" className="text-sm text-primary hover:underline">
              Solutions
            </Link>
            <Link href="/pricing" className="text-sm text-primary hover:underline">
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

