import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Error 500 - Nyumba Zetu",
  description: "Something went wrong on our end",
};

export default function Error500Page() {
  return (
    <Section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="row mt-lg-0 mt-8">
          <div className="col-lg-5 my-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-slate-50 mt-5">
              Error 500
            </h1>
            <h2 className="text-2xl text-slate-600 dark:text-slate-400 opacity-80 mt-4">
              Something went wrong
            </h2>
            <p className="lead opacity-60 text-lg text-slate-600 dark:text-slate-400 mt-4">
              We suggest you to go to the homepage while we solve this issue.
            </p>
            <Link href="/">
              <Button size="lg" className="mt-4">
                Go to Homepage
              </Button>
            </Link>
          </div>
          <div className="col-lg-7 my-auto">
            <Image
              className="w-100"
              src="/legacy/images/illustrations/error-500.png"
              alt="500-error"
              width={600}
              height={600}
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  );
}


