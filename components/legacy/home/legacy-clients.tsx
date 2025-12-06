"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { mainClients } from "@/lib/clients-data";

export function LegacyClients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3; // Show 3 items at a time on desktop
  const itemWidth = 320; // Increased width for better spacing
  const gap = 24; // Gap between items

  const maxIndex = Math.max(0, mainClients.length - itemsPerView);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <Section className="bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Some Of Our Happy Clients"
          description="Join the community of successful clients using Nyumba Zetu. From bustling commercial centers in Nairobi to serene residential complexes in Lavington, our software has been the backbone of successful property management strategies."
        />

        {/* Main Carousel */}
        <div className="relative mt-12">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl border-2 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl border-2 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
                gap: `${gap}px`,
              }}
            >
              {mainClients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0"
                  style={{ width: `${itemWidth}px` }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-slate-50 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center p-4">
                        <Image
                          src={`/legacy/images/clients/${client.imageUrl}`}
                          alt={client.name || ""}
                          width={280}
                          height={180}
                          className="w-full h-full object-contain"
                          sizes="(max-width: 768px) 100vw, 280px"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-50 mb-1">
                        {client.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {client.location}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Clients Button */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/clients" className="group">
              View All Clients
              <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

