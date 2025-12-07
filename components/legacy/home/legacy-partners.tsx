"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Partner {
  id: number;
  name: string;
  image: string;
  url: string;
  default?: boolean;
}

export function LegacyPartners() {
  const items: Partner[] = [
    {
      id: 1,
      name: "NCBA",
      image: "/legacy/images/banks/ncba.png",
      url: "https://ke.ncbagroup.com/",
      default: true,
    },
    {
      id: 2,
      name: "Co-op Bank",
      image: "/legacy/images/banks/co-op.png",
      url: "",
    },
    {
      id: 3,
      name: "DTB",
      image: "/legacy/images/banks/dtb.png",
      url: "",
    },
    {
      id: 4,
      name: "Equity Bank",
      image: "/legacy/images/banks/equity.png",
      url: "",
    },
    {
      id: 5,
      name: "KCB",
      image: "/legacy/images/banks/kcb.png",
      url: "",
    },
    {
      id: 6,
      name: "MPESA",
      image: "/legacy/images/banks/mpesa.svg",
      url: "",
    },
    {
      id: 7,
      name: "Stanbic Bank",
      image: "/legacy/images/banks/stanbic.png",
      url: "https://www.stanbicbank.co.ke/",
    },
    {
      id: 8,
      name: "I&M Bank",
      image: "/legacy/images/banks/iandm.png",
      url: "",
    },
    {
      id: 9,
      name: "ABSA Bank",
      image: "/legacy/images/banks/absa.png",
      url: "",
    },
    {
      id: 10,
      name: "Standard Chartered Bank",
      image: "/legacy/images/banks/stanchart.png",
      url: "",
    },
    {
      id: 11,
      name: "Gulf African Bank",
      image: "/legacy/images/banks/gulf.png",
      url: "",
    },
    {
      id: 12,
      name: "Prime Bank",
      image: "/legacy/images/banks/prime.png",
      url: "",
    },
    {
      id: 13,
      name: "Housing Finance",
      image: "/legacy/images/banks/hfc.png",
      url: "",
    },
  ];

  // Create infinite loop by duplicating items
  const partnersInfiniteItems = [...items, ...items, ...items];
  const partnersStartIndex = items.length; // Start in the middle set
  
  const partnersCarouselRef = useRef<HTMLDivElement>(null);
  const partnersPositionRef = useRef<number>(partnersStartIndex * (150 + 16));
  const partnersScrollPausedRef = useRef<boolean>(false);
  const partnersItemWidth = 150; // Width for each logo
  const partnersGap = 16; // Gap between items
  const partnersItemsPerView = 6; // Show 6 logos at a time on desktop

  // Continuous smooth scroll for Banking Partners Carousel
  useEffect(() => {
    if (!partnersCarouselRef.current) return;

    let animationFrameId: number;
    const scrollSpeed = 0.3; // pixels per frame (adjust for speed)
    const itemWidthWithGap = partnersItemWidth + partnersGap;
    const totalItems = items.length;
    const maxPosition = totalItems * 2 * itemWidthWithGap;

    const animate = () => {
      if (!partnersScrollPausedRef.current) {
        // Continuously scroll
        partnersPositionRef.current += scrollSpeed;
        
        // Check if we've scrolled past the end of the second set
        if (partnersPositionRef.current >= maxPosition) {
          // Reset to middle set position seamlessly
          partnersPositionRef.current = partnersStartIndex * itemWidthWithGap;
        }
      }

      // Update the transform
      if (partnersCarouselRef.current) {
        const carouselInner = partnersCarouselRef.current.querySelector('.flex') as HTMLElement;
        if (carouselInner) {
          carouselInner.style.transform = `translateX(-${partnersPositionRef.current}px)`;
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
  }, [partnersStartIndex, partnersItemWidth, partnersGap, items.length]);

  const nextPartnersSlide = () => {
    const itemWidthWithGap = partnersItemWidth + partnersGap;
    const totalItems = items.length;
    const maxPosition = totalItems * 2 * itemWidthWithGap;
    
    partnersPositionRef.current += itemWidthWithGap;
    
    // Handle loop
    if (partnersPositionRef.current >= maxPosition) {
      partnersPositionRef.current = partnersStartIndex * itemWidthWithGap;
    }
    
    partnersScrollPausedRef.current = true;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      partnersScrollPausedRef.current = false;
    }, 2000);
  };

  const prevPartnersSlide = () => {
    const itemWidthWithGap = partnersItemWidth + partnersGap;
    const totalItems = items.length;
    const minPosition = 0;
    
    partnersPositionRef.current -= itemWidthWithGap;
    
    // Handle loop
    if (partnersPositionRef.current < minPosition) {
      partnersPositionRef.current = (partnersStartIndex + totalItems - 1) * itemWidthWithGap;
    }
    
    partnersScrollPausedRef.current = true;
    
    // Resume auto-scroll after a delay
    setTimeout(() => {
      partnersScrollPausedRef.current = false;
    }, 2000);
  };

  return (
    <Section className="bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Banking Partners"
          description="Experience smooth, secure transactions and automatic payment reconciliation through our trusted network of local banks and mobile payment platforms."
        />

        {/* Banking Partners Carousel */}
        <div className="mt-12">
          <div className="relative">
            {/* Navigation Buttons */}
            {items.length > partnersItemsPerView && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevPartnersSlide}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl"
                  aria-label="Previous slide"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextPartnersSlide}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110 transition-all duration-200 opacity-60 hover:opacity-100 hover:shadow-xl"
                  aria-label="Next slide"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden px-12" ref={partnersCarouselRef}>
              <div
                className="flex"
                style={{
                  gap: `${partnersGap}px`,
                }}
              >
                {partnersInfiniteItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: `${partnersItemWidth}px` }}
                  >
                    <Link
                      href={item.url || "#"}
                      target={item.url ? "_blank" : undefined}
                      rel={item.url ? "noopener noreferrer" : undefined}
                      className="w-full h-24 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center p-4 border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={48}
                        className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
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

