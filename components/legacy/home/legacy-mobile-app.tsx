import { Section } from "@/components/section";
import Image from "next/image";
import Link from "next/link";

export function LegacyMobileApp() {
  return (
    <Section className="border-radius-lg">
      <div className="container mx-auto px-4 position-relative">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 md:w-2/3">
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
              Download Our App
            </h2>
            <p className="lead text-lg text-slate-600 dark:text-slate-400">
              Experience the convenience of effortlessly managing your bills and conducting payments right from the palm of your hand.
            </p>
          </div>

          {/* App Store Button */}
          <div className="w-full lg:w-1/2 md:w-1/3 flex justify-start lg:justify-end mt-4 md:mt-0">
            <Link
              href="https://apps.apple.com/us/app/nyumba-zetu/id6456750559"
              className="bg-gradient-dark border-radius-md py-1 px-1 d-inline-block"
            >
              <Image
                className="w-full"
                src="/legacy/images/logos/app-store-button.svg"
                alt="Download on the App Store"
                width={160}
                height={50}
                style={{ maxWidth: "160px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

