"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SparklesIcon, TrophyIcon } from "@heroicons/react/24/solid";

export function LegacyHomeHeader() {
  const [currentText, setCurrentText] = useState("award-winning");

  useEffect(() => {
    const strings = [
      "groundbreaking",
      "innovative",
      "pioneering",
      "trailblazing",
      "award-winning",
    ];

    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    let backSpeed = 50;
    let backDelay = 2000;
    let startDelay = 3000;

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
    <Section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/3 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              <SparklesIcon className="h-4 w-4" />
              <span>Kenya&apos;s Leading Property Management Platform</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-4 leading-tight">
              Forget Everything
              <br />
              You Know About
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Property Management
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-4"
            >
              Simple. Transparent. Convenient
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Join the{" "}
              <span className="font-bold text-primary inline-flex items-center gap-1">
                <span>{currentText}</span>
                {currentText === "award-winning" && <TrophyIcon className="h-5 w-5 text-yellow-500" />}
              </span>{" "}
              revolution that&apos;s transforming real estate efficiency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="/contact">Request a Demo</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="/product">Explore Platform</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full lg:w-1/3 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl"></div>
              <Image
                src="/legacy/images/home/cool-again-nb.jpg"
                alt="Make landlords cool again"
                width={300}
                height={300}
                className="relative rounded-full shadow-2xl ring-4 ring-primary/20"
                style={{ height: "300px", width: "300px", objectFit: "cover" }}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

