"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "@heroicons/react/24/solid";

export function ProductVideo() {
  return (
    <Section className="bg-slate-50 dark:bg-slate-900">
      <SectionHeader
        title="See Nyumba Zetu in Action"
        description="Watch a 3-minute overview of how Nyumba Zetu transforms property management operations."
      />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video bg-slate-900 dark:bg-slate-800 rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary via-secondary/90 to-secondary">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                <PlayIcon className="h-10 w-10 text-white ml-1" />
              </div>
              <p className="text-white text-sm font-medium mb-2">3-Minute Platform Overview</p>
              <p className="text-white text-xs">Video placeholder - Dashboard walkthrough and key features</p>
            </div>
          </div>
          
          {/* Overlay with play button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors duration-200 cursor-pointer group">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-110"
              onClick={() => {
                // This will open the video modal or navigate to video page
                // For now, it's a placeholder
                console.log("Play 3-minute overview video");
              }}
            >
              <PlayIcon className="h-5 w-5 mr-2" />
              Watch 3-Minute Overview
            </Button>
          </div>
        </motion.div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium">Video content:</span> Platform dashboard walkthrough, rent collection workflow, accounting features, tenant portal demo, and mobile app preview
          </p>
        </div>
      </div>
    </Section>
  );
}

