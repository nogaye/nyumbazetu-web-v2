"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface MediaOutlet {
  name: string;
  logo: string;
  url: string;
}

// Arranged from most popular to least popular
const mediaOutlets: MediaOutlet[] = [
  { name: "Daily Nation", logo: "/legacy/media/daily-nation-logo.svg", url: "#" },
  { name: "KTN News", logo: "/legacy/media/ktn-logo.jpeg", url: "#" },
  { name: "TV47 News", logo: "/legacy/media/tv-47-logo.jpeg", url: "#" },
  { name: "Tech Africa News", logo: "/legacy/media/tech-africa-news.png", url: "#" },
  { name: "Business Tech Kenya", logo: "/legacy/media/business-tech-logo.webp", url: "#" },
  { name: "Tech Trends Kenya", logo: "/legacy/media/tech-trends-logo.png", url: "#" },
  { name: "Africa Business News", logo: "/legacy/media/africa-business-news-logo.png", url: "#" },
  { name: "Nipashe Biz", logo: "/legacy/media/nipashe-logo.png", url: "#" },
  { name: "Insider Kenya", logo: "/legacy/media/insider-kenya-logo.webp", url: "#" },
  { name: "Swala Nyeti", logo: "/legacy/media/swala-nyeti-logo.png", url: "#" },
  { name: "Serrari Group", logo: "/legacy/media/serrari-logo.webp", url: "#" },
  { name: "Bizna Kenya", logo: "/legacy/media/bizna-Logo.webp", url: "#" },
  { name: "Aptantech", logo: "/legacy/media/aptan-logo.webp", url: "#" },
];

export function AsSeenOn() {
  // Create infinite loop by duplicating items
  const infiniteItems = [...mediaOutlets, ...mediaOutlets, ...mediaOutlets];
  const startIndex = mediaOutlets.length; // Start in the middle set
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<number>(startIndex * (150 + 16));
  const scrollPausedRef = useRef<boolean>(false);
  const itemWidth = 150; // Width for each logo
  const gap = 16; // Gap between items
  const itemsPerView = 6; // Show 6 logos at a time on desktop

  // Continuous smooth scroll for Media Carousel
  useEffect(() => {
    if (!carouselRef.current) return;

    let animationFrameId: number;
    const scrollSpeed = 0.3; // pixels per frame (adjust for speed)
    const itemWidthWithGap = itemWidth + gap;
    const totalItems = mediaOutlets.length;
    const maxPosition = totalItems * 2 * itemWidthWithGap;

    const animate = () => {
      if (!scrollPausedRef.current) {
        // Continuously scroll
        positionRef.current += scrollSpeed;
        
        // Check if we've scrolled past the end of the second set
        if (positionRef.current >= maxPosition) {
          // Reset to middle set position seamlessly
          positionRef.current = startIndex * itemWidthWithGap;
        }
      }

      // Update the transform
      if (carouselRef.current) {
        const carouselInner = carouselRef.current.querySelector('.flex') as HTMLElement;
        if (carouselInner) {
          carouselInner.style.transform = `translateX(-${positionRef.current}px)`;
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
  }, [startIndex, itemWidth, gap, mediaOutlets.length]);

  const nextSlide = () => {
    const itemWidthWithGap = itemWidth + gap;
    const totalItems = mediaOutlets.length;
    const maxPosition = totalItems * 2 * itemWidthWithGap;
    
    positionRef.current += itemWidthWithGap;
    
    // Handle loop
    if (positionRef.current >= maxPosition) {
      positionRef.current = startIndex * itemWidthWithGap;
    }
    
    scrollPausedRef.current = true;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      scrollPausedRef.current = false;
    }, 2000);
  };

  const prevSlide = () => {
    const itemWidthWithGap = itemWidth + gap;
    const totalItems = mediaOutlets.length;
    const minPosition = 0;
    
    positionRef.current -= itemWidthWithGap;
    
    // Handle loop
    if (positionRef.current < minPosition) {
      positionRef.current = (startIndex + totalItems - 1) * itemWidthWithGap;
    }
    
    scrollPausedRef.current = true;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      scrollPausedRef.current = false;
    }, 2000);
  };

  return (
    <Section className="bg-secondary py-12 border-b border-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-white uppercase tracking-wider mb-6">
            As Seen On
          </p>
        </div>

        {/* Media Carousel */}
        <div className="mt-8">
          <div className="relative">
            {/* Navigation Buttons */}
            {mediaOutlets.length > itemsPerView && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevSlide}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/20 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 shadow-sm hover:bg-white/30 dark:hover:bg-slate-800 hover:shadow-lg hover:border-white/50 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl"
                  aria-label="Previous slide"
                >
                  <ChevronLeftIcon className="h-4 w-4 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextSlide}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/20 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/50 shadow-sm hover:bg-white/30 dark:hover:bg-slate-800 hover:shadow-lg hover:border-white/50 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl"
                  aria-label="Next slide"
                >
                  <ChevronRightIcon className="h-4 w-4 text-white" />
                </Button>
              </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden px-12" ref={carouselRef}>
              <div
                className="flex"
                style={{
                  gap: `${gap}px`,
                }}
              >
                {infiniteItems.map((outlet, index) => (
                  <div
                    key={`${outlet.name}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: `${itemWidth}px` }}
                  >
                    <Link
                      href={outlet.url || "#"}
                      target={outlet.url !== "#" ? "_blank" : undefined}
                      rel={outlet.url !== "#" ? "noopener noreferrer" : undefined}
                      className="w-full h-24 bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center p-4 border border-white/20 dark:border-slate-700/50 hover:border-white/40 dark:hover:border-primary/30 transition-all duration-300"
                    >
                      <Image
                        src={outlet.logo}
                        alt={outlet.name}
                        width={120}
                        height={48}
                        className="w-full h-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-all duration-300"
                        sizes="(max-width: 640px) 150px, 150px"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

