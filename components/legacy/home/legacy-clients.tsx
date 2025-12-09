"use client";

import { useState, useEffect, useRef } from "react";
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
  
  // Create infinite loop by duplicating items
  const pmInfiniteItems = [...propertyManagementClientsWithLogos, ...propertyManagementClientsWithLogos, ...propertyManagementClientsWithLogos];
  const pmStartIndex = propertyManagementClientsWithLogos.length; // Start in the middle set
  
  const [pmCurrentIndex, setPmCurrentIndex] = useState(pmStartIndex);
  const [pmIsTransitioning, setPmIsTransitioning] = useState(false);
  const pmCarouselRef = useRef<HTMLDivElement>(null);
  const pmPositionRef = useRef<number>(pmStartIndex * (150 + 16));
  const pmScrollPausedRef = useRef<boolean>(false);
  const pmItemsPerView = 6; // Show 6 logos at a time on desktop
  const pmItemWidth = 150; // Width for each logo
  const pmGap = 16; // Gap between items

  // Property Estates Carousel State
  // Create infinite loop by duplicating items
  const estatesInfiniteItems = [...mainClients, ...mainClients, ...mainClients];
  const estatesStartIndex = mainClients.length; // Start in the middle set
  
  const [estatesCurrentIndex, setEstatesCurrentIndex] = useState(estatesStartIndex);
  const [estatesIsTransitioning, setEstatesIsTransitioning] = useState(false);
  const estatesCarouselRef = useRef<HTMLDivElement>(null);
  const estatesPositionRef = useRef<number>(estatesStartIndex * (320 + 24));
  const estatesScrollPausedRef = useRef<boolean>(false);
  const estatesItemsPerView = 3; // Show 3 items at a time on desktop
  const estatesItemWidth = 320; // Increased width for better spacing
  const estatesGap = 24; // Gap between items

  // Continuous smooth scroll for Property Management Companies Carousel
  useEffect(() => {
    if (!pmCarouselRef.current) return;

    let animationFrameId: number;
    const scrollSpeed = 0.3; // pixels per frame (adjust for speed)
    const itemWidthWithGap = pmItemWidth + pmGap;
    const totalItems = propertyManagementClientsWithLogos.length;
    const maxPosition = totalItems * 2 * itemWidthWithGap;

    const animate = () => {
      if (!pmScrollPausedRef.current) {
        // Continuously scroll
        pmPositionRef.current += scrollSpeed;
        
        // Check if we've scrolled past the end of the second set
        if (pmPositionRef.current >= maxPosition) {
          // Reset to middle set position seamlessly
          pmPositionRef.current = pmStartIndex * itemWidthWithGap;
        }
      }

      // Update the transform
      if (pmCarouselRef.current) {
        const carouselInner = pmCarouselRef.current.querySelector('.flex') as HTMLElement;
        if (carouselInner) {
          carouselInner.style.transform = `translateX(-${pmPositionRef.current}px)`;
          carouselInner.style.transition = 'none'; // No transition for smooth continuous scroll
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [pmStartIndex, pmItemWidth, pmGap, propertyManagementClientsWithLogos.length]);

  const nextPmSlide = () => {
    const itemWidthWithGap = pmItemWidth + pmGap;
    const totalItems = propertyManagementClientsWithLogos.length;
    const maxPosition = totalItems * 2 * itemWidthWithGap;
    
    pmPositionRef.current += itemWidthWithGap;
    
    // Handle loop
    if (pmPositionRef.current >= maxPosition) {
      pmPositionRef.current = pmStartIndex * itemWidthWithGap;
    }
    
    pmScrollPausedRef.current = true;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      pmScrollPausedRef.current = false;
    }, 2000);
  };

  const prevPmSlide = () => {
    const itemWidthWithGap = pmItemWidth + pmGap;
    const totalItems = propertyManagementClientsWithLogos.length;
    const minPosition = 0;
    
    pmPositionRef.current -= itemWidthWithGap;
    
    // Handle loop
    if (pmPositionRef.current < minPosition) {
      pmPositionRef.current = (pmStartIndex + totalItems - 1) * itemWidthWithGap;
    }
    
    pmScrollPausedRef.current = true;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      pmScrollPausedRef.current = false;
    }, 2000);
  };

  // Continuous smooth scroll for Property Estates Carousel
  useEffect(() => {
    if (!estatesCarouselRef.current) return;

    let animationFrameId: number;
    const scrollSpeed = 0.3; // pixels per frame (adjust for speed)
    const itemWidthWithGap = estatesItemWidth + estatesGap;
    const totalItems = mainClients.length;
    const maxPosition = totalItems * 2 * itemWidthWithGap;

    const animate = () => {
      if (!estatesScrollPausedRef.current) {
        // Continuously scroll
        estatesPositionRef.current += scrollSpeed;
        
        // Check if we've scrolled past the end of the second set
        if (estatesPositionRef.current >= maxPosition) {
          // Reset to middle set position seamlessly
          estatesPositionRef.current = estatesStartIndex * itemWidthWithGap;
        }
      }

      // Update the transform
      if (estatesCarouselRef.current) {
        const carouselInner = estatesCarouselRef.current.querySelector('.flex') as HTMLElement;
        if (carouselInner) {
          carouselInner.style.transform = `translateX(-${estatesPositionRef.current}px)`;
          carouselInner.style.transition = 'none'; // No transition for smooth continuous scroll
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [estatesStartIndex, estatesItemWidth, estatesGap, mainClients.length]);

  // Handle infinite loop for Estates carousel (for manual navigation)
  useEffect(() => {
    if (!estatesCarouselRef.current || estatesIsTransitioning) return;

    const totalItems = mainClients.length;
    const maxIndex = totalItems * 2; // End of second set
    const minIndex = 0; // Start of first set

    if (estatesCurrentIndex >= maxIndex) {
      setEstatesIsTransitioning(true);
      // Jump to middle set without animation
      setTimeout(() => {
        setEstatesCurrentIndex(estatesStartIndex);
        setEstatesIsTransitioning(false);
      }, 50);
    } else if (estatesCurrentIndex < minIndex) {
      setEstatesIsTransitioning(true);
      // Jump to middle set without animation
      setTimeout(() => {
        setEstatesCurrentIndex(estatesStartIndex + totalItems - 1);
        setEstatesIsTransitioning(false);
      }, 50);
    }
  }, [estatesCurrentIndex, estatesStartIndex, mainClients.length, estatesIsTransitioning]);

  const nextEstatesSlide = () => {
    const itemWidthWithGap = estatesItemWidth + estatesGap;
    const totalItems = mainClients.length;
    const maxPosition = totalItems * 2 * itemWidthWithGap;
    
    estatesPositionRef.current += itemWidthWithGap;
    
    // Handle loop
    if (estatesPositionRef.current >= maxPosition) {
      estatesPositionRef.current = estatesStartIndex * itemWidthWithGap;
    }
    
    estatesScrollPausedRef.current = true;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      estatesScrollPausedRef.current = false;
    }, 2000);
  };

  const prevEstatesSlide = () => {
    const itemWidthWithGap = estatesItemWidth + estatesGap;
    const totalItems = mainClients.length;
    const minPosition = 0;
    
    estatesPositionRef.current -= itemWidthWithGap;
    
    // Handle loop
    if (estatesPositionRef.current < minPosition) {
      estatesPositionRef.current = (estatesStartIndex + totalItems - 1) * itemWidthWithGap;
    }
    
    estatesScrollPausedRef.current = true;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      estatesScrollPausedRef.current = false;
    }, 2000);
  };

  const goToEstatesSlide = (index: number) => {
    setEstatesCurrentIndex(estatesStartIndex + index);
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
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl"
                  aria-label="Previous slide"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextPmSlide}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl"
                  aria-label="Next slide"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden px-12" ref={pmCarouselRef}>
              <div
                className="flex"
                style={{
                  gap: `${pmGap}px`,
                }}
              >
                {pmInfiniteItems.map((client, index) => {
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
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextEstatesSlide}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>

            {/* Carousel Container */}
            <div className="overflow-hidden px-12" ref={estatesCarouselRef}>
              <div
                className="flex"
                style={{
                  gap: `${estatesGap}px`,
                }}
              >
                {estatesInfiniteItems.map((client, index) => (
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
              {mainClients.map((_, index) => {
                const displayIndex = ((estatesCurrentIndex - estatesStartIndex) % mainClients.length + mainClients.length) % mainClients.length;
                return (
                  <button
                    key={index}
                    onClick={() => goToEstatesSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      displayIndex === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* View All Clients Button */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/clients" className="group">
              View More Clients
              <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

