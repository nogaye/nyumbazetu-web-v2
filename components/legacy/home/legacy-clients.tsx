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
import { propertyManagementClients } from "@/lib/property-management-clients";

export function LegacyClients() {
  // Property Management Companies Carousel State
  const propertyManagementClientsWithLogos = propertyManagementClients.filter(
    (client) => client.imageUrl
  );
  const [pmCurrentIndex, setPmCurrentIndex] = useState(0);
  const pmItemsPerView = 6; // Show 6 logos at a time on desktop
  const pmItemWidth = 150; // Width for each logo
  const pmGap = 16; // Gap between items
  const maxPmIndex = Math.max(0, propertyManagementClientsWithLogos.length - pmItemsPerView);

  // Property Estates Carousel State
  const [estatesCurrentIndex, setEstatesCurrentIndex] = useState(0);
  const estatesItemsPerView = 3; // Show 3 items at a time on desktop
  const estatesItemWidth = 320; // Increased width for better spacing
  const estatesGap = 24; // Gap between items
  const maxEstatesIndex = Math.max(0, mainClients.length - estatesItemsPerView);

  // Auto-scroll Property Management Companies Carousel
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setPmCurrentIndex((prev) => {
        if (prev >= maxPmIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [maxPmIndex]);

  const nextPmSlide = () => {
    setPmCurrentIndex((prev) => Math.min(prev + 1, maxPmIndex));
  };

  const prevPmSlide = () => {
    setPmCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Auto-scroll Property Estates Carousel
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setEstatesCurrentIndex((prev) => {
        if (prev >= maxEstatesIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [maxEstatesIndex]);

  const nextEstatesSlide = () => {
    setEstatesCurrentIndex((prev) => Math.min(prev + 1, maxEstatesIndex));
  };

  const prevEstatesSlide = () => {
    setEstatesCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToEstatesSlide = (index: number) => {
    setEstatesCurrentIndex(Math.min(index, maxEstatesIndex));
  };

  // Helper function to check if URL is external
  const isExternalUrl = (url?: string) => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  return (
    <Section className="bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Some Of Our Happy Clients"
          description="Join the community of successful clients using Nyumba Zetu. From bustling commercial centers in Nairobi to serene residential complexes in Lavington, our software has been the backbone of successful property management strategies."
        />

        {/* Property Management Companies Carousel */}
        <div className="mt-12 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">
            Property Management Companies
          </h3>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Leading property management companies using Nyumba Zetu
          </p>
          
          <div className="relative">
            {/* Navigation Buttons */}
            {propertyManagementClientsWithLogos.length > pmItemsPerView && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevPmSlide}
                  disabled={pmCurrentIndex === 0}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Previous slide"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextPmSlide}
                  disabled={pmCurrentIndex >= maxPmIndex}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Next slide"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden px-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${pmCurrentIndex * (pmItemWidth + pmGap)}px)`,
                  gap: `${pmGap}px`,
                }}
              >
                {propertyManagementClientsWithLogos.map((client, index) => {
                  const imageSrc = isExternalUrl(client.imageUrl)
                    ? client.imageUrl!
                    : `/legacy/images/clients/${client.imageUrl}`;

                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{ width: `${pmItemWidth}px` }}
                    >
                      <div className="w-full h-24 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center p-4 border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300">
                        <Image
                          src={imageSrc}
                          alt={client.name || ""}
                          width={120}
                          height={48}
                          className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                          sizes="(max-width: 640px) 150px, 150px"
                          loading="lazy"
                          unoptimized={isExternalUrl(client.imageUrl)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Property Estates Carousel */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">
            Property Estates
          </h3>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Leading property estates and residential complexes using Nyumba Zetu
          </p>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevEstatesSlide}
              disabled={estatesCurrentIndex === 0}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextEstatesSlide}
              disabled={estatesCurrentIndex >= maxEstatesIndex}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>

            {/* Carousel Container */}
            <div className="overflow-hidden px-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${estatesCurrentIndex * (estatesItemWidth + estatesGap)}px)`,
                  gap: `${estatesGap}px`,
                }}
              >
                {mainClients.map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0"
                    style={{ width: `${estatesItemWidth}px` }}
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
                        <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-50 mb-1 text-center">
                          {client.name}
                        </h4>
                        {client.location && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                            {client.location}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxEstatesIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToEstatesSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    estatesCurrentIndex === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
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

