"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";

const mediaOutlets = [
  { name: "Business Daily", url: "#" },
  { name: "TechCrunch", url: "#" },
  { name: "The Standard", url: "#" },
  { name: "Disrupt Africa", url: "#" },
  { name: "Techpoint Africa", url: "#" },
  { name: "Ventureburn", url: "#" },
];

export function AsSeenOn() {
  return (
    <Section className="bg-secondary py-12 border-b border-secondary/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-6">
            As Seen On
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {mediaOutlets.map((outlet, idx) => {
              const MotionComponent = outlet.url !== "#" ? motion.a : motion.div;
              const linkProps = outlet.url !== "#" 
                ? { href: outlet.url, target: "_blank", rel: "noopener noreferrer" }
                : {};
              
              return (
                <MotionComponent
                  key={outlet.name}
                  {...linkProps}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-center h-16 w-full group"
                >
                  <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center p-3 group-hover:bg-white/20 transition-all duration-200">
                    <div className="w-full h-8 bg-white/20 rounded flex items-center justify-center">
                      <span className="text-white/60 group-hover:text-white/80 transition-colors duration-200 text-xs font-medium text-center px-2">
                        {outlet.name}
                      </span>
                    </div>
                  </div>
                </MotionComponent>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

