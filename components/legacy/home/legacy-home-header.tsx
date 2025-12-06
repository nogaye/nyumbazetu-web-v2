"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function LegacyHomeHeader() {
  const typedElementRef = useRef<HTMLSpanElement>(null);
  const [currentText, setCurrentText] = useState("award-winning 🏆");

  useEffect(() => {
    const strings = [
      "groundbreaking 💥",
      "innovative 🛠️",
      "pioneering 🚀",
      "trailblazing 🔥",
      "award-winning 🏆",
    ];

    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;
    let backSpeed = 90;
    let backDelay = 3000;
    let startDelay = 5000;

    const timeout = setTimeout(() => {
      const type = () => {
        const currentString = strings[currentIndex];
        
        if (!isDeleting && charIndex < currentString.length) {
          setCurrentText(currentString.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(type, typeSpeed);
        } else if (isDeleting && charIndex > 0) {
          setCurrentText(currentString.substring(0, charIndex - 1));
          charIndex--;
          setTimeout(type, backSpeed);
        } else if (!isDeleting && charIndex === currentString.length) {
          setTimeout(() => {
            isDeleting = true;
            type();
          }, backDelay);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % strings.length;
          setTimeout(type, 500);
        }
      };

      type();
    }, startDelay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row mt-5 md:mt-7">
          <div className="w-full md:w-2/3 md:ml-auto text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Forget Everything
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              You Know About
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Property Management Systems
            </h2>

            <p className="text-lg md:pe-5 md:me-5 mt-4 font-bold text-slate-700 dark:text-slate-300 hidden md:block">
              Simple. Transparent. Convenient
            </p>

            <p className="md:pe-5 md:me-5 text-slate-700 dark:text-slate-300 block md:hidden mb-4">
              Join the <span className="font-bold">{currentText}</span> revolution that&apos;s transforming real estate efficiency.
            </p>

            <p className="md:pe-5 md:me-5 text-slate-700 dark:text-slate-300 hidden md:block mb-4">
              Join the <span className="font-bold" ref={typedElementRef}>{currentText}</span> revolution that&apos;s transforming real estate efficiency.
            </p>

            <Button size="lg" className="mt-4" asChild>
              <a href="/contact">Request a demo</a>
            </Button>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right mt-4 md:mt-0">
            <Image
              src="/legacy/images/home/cool-again-nb.jpg"
              alt="Make landlords cool again"
              width={250}
              height={250}
              className="rounded-full shadow-xl mx-auto"
              style={{ height: "250px", width: "250px", objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

