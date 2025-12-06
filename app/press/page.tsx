
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";






interface MediaMention {
  outlet: string;
  headline: string;
  description: string;
  link: string;
  date?: string;
  category: "mainstream" | "digital";
}

const mediaMentions: MediaMention[] = [
  {
    outlet: "KTN News",
    headline: "NCBA Partners with Zetu Innovations",
    description: "NCBA Group partners with Zetu Innovations to roll out Nyumba Zetu property management platform.",
    link: "https://www.youtube.com/watch?v=AnvB9Br6RvI",
    category: "mainstream",
  },
  {
    outlet: "Daily Nation",
    headline: "AI-Powered System for SMEs and Rentals",
    description: "Nyumba Zetu introduces an AI-powered system designed to streamline property management for SMEs and rental businesses.",
    link: "https://nation.africa/kenya/business/enterprise/ai-powered-system-for-smes-and-rentals-4773272#google_vignette",
    date: "2025",
    category: "mainstream",
  },
  {
    outlet: "TV47 News",
    headline: "Property Management Platform Launch",
    description: "Coverage of the Nyumba Zetu platform launch and its impact on property management in Kenya.",
    link: "https://www.youtube.com/watch?v=dayoO5_tcRk",
    category: "mainstream",
  },
  {
    outlet: "Tech Africa News",
    headline: "NCBA Partners with Zetu Innovations to Digitise Property Management",
    description: "NCBA partners with Zetu Innovations to digitize property management in Kenya through the Nyumba Zetu platform.",
    link: "https://techafricanews.com/2025/08/01/ncba-partners-with-zetu-innovations-to-digitise-property-management-in-kenya/",
    date: "Aug 1, 2025",
    category: "digital",
  },
  {
    outlet: "Bizna Kenya",
    headline: "Nyumba Zetu Platform",
    description: "Comprehensive coverage of the Nyumba Zetu platform and its features for property managers.",
    link: "https://biznakenya.com/nyumba-zetu-platform/",
    category: "digital",
  },
  {
    outlet: "Kenyan Corporates",
    headline: "NCBA-Zetu Innovations Partner in Distribution Deal",
    description: "NCBA and Zetu Innovations partner in Nyumba Zetu distribution deal to support property managers and landlords.",
    link: "https://kenyancorporates.co.ke/2025/08/05/ncba-zetu-innovations-partner-in-nyumba-zetu-distribution-deal-tosupport-property-managers-and-landlords/",
    date: "Aug 5, 2025",
    category: "digital",
  },
  {
    outlet: "Serrari Group",
    headline: "NCBA and Zetu Innovations Forge Partnership",
    description: "NCBA and Zetu Innovations forge partnership in property management to support developers and property managers.",
    link: "https://serrarigroup.com/ncba-and-zetu-innovations-forge-partnership-in-property-management/",
    category: "digital",
  },
  {
    outlet: "Swala Nyeti",
    headline: "NCBA and Zetu Innovations Collaborate to Unveil Property Management System",
    description: "NCBA and Zetu Innovations collaborate to unveil property management system designed to simplify operations.",
    link: "https://www.swalanyeti.co.ke/business/article/10582/ncba-and-zetu-innovations-collaborate-to-unveil-property-management-system/",
    category: "digital",
  },
  {
    outlet: "Insider Kenya",
    headline: "Zetu Innovations Coverage",
    description: "Latest news and updates about Zetu Innovations and the Nyumba Zetu platform.",
    link: "https://insiderkenya.com/tag/zetu-innovations/",
    category: "digital",
  },
  {
    outlet: "Aptantech",
    headline: "NCBA Partners with Zetu Innovations in Distribution Deal",
    description: "NCBA partners with Zetu Innovations in Nyumba Zetu distribution deal to support developers and property managers.",
    link: "https://aptantech.com/2025/08/01/ncba-partners-with-zetu-innovations-in-nyumba-zetu-distribution-deal-to-support-developers-and-property-managers/",
    date: "Aug 1, 2025",
    category: "digital",
  },
  {
    outlet: "Africa Business News",
    headline: "NCBA-Zetu Innovations Launch Nyumba Zetu",
    description: "NCBA and Zetu Innovations launch Nyumba Zetu to simplify property management for landlords and tenants.",
    link: "https://africabusinessnews.co.ke/ncba-zetu-innovations-launch-nyumba-zetu-to-simplify-property-management/",
    category: "digital",
  },
  {
    outlet: "Digital Banking News",
    headline: "NCBA Group Partners with Zetu Innovations",
    description: "NCBA Group partners with Zetu Innovations to roll out Nyumba Zetu property platform for enhanced property management.",
    link: "https://digitalbankingnews.co.ke/ncba-group-partners-with-zetu-innovations-to-roll-out-nyumba-zetu-property-platform/",
    category: "digital",
  },
  {
    outlet: "Tech Trends Kenya",
    headline: "NCBA Announces Distributor Partnership",
    description: "NCBA announces distributor partnership with property management platform Zetu to support property managers.",
    link: "https://techtrendske.co.ke/2025/07/31/ncba-announces-distributor-partnership-with-property-management-platform-zetu/",
    date: "Jul 31, 2025",
    category: "digital",
  },
  {
    outlet: "Hapa Kenya",
    headline: "Zetu Innovations Coverage",
    description: "Latest updates and news about Zetu Innovations and their property management solutions.",
    link: "https://hapakenya.com/tag/zetu-innovations/",
    category: "digital",
  },
  {
    outlet: "Nipashe Biz",
    headline: "NCBA-Zetu Unveil Nyumba Zetu Platform",
    description: "NCBA and Zetu unveil Nyumba Zetu platform to digitize property management in Kenya.",
    link: "https://nipashebiz.co.ke/ncba-zetu-unveil-nyumba-zetu-platform-to-digitize-property-management/",
    category: "digital",
  },
  {
    outlet: "Business Tech Kenya",
    headline: "NCBA Nyumba Zetu to Support Property Management",
    description: "NCBA and Nyumba Zetu collaborate to support property management in Kenya with innovative solutions.",
    link: "https://businesstech.co.ke/ncba-nyumba-zetu-to-support-property-management-in-kenya/",
    category: "digital",
  },
  {
    outlet: "Soko Directory",
    headline: "NCBA Enters New Deal to Support Property Managers",
    description: "NCBA enters a new deal to support property managers and landlords through the Nyumba Zetu platform.",
    link: "https://sokodirectory.com/2025/07/ncba-enters-a-new-deal-to-support-property-managers-and-landlords/",
    date: "Jul 2025",
    category: "digital",
  },
];

const getOutletLogo = (outlet: string) => {
  // Create text-based logos for outlets
  const initials = outlet
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);

  return (
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
      <span className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300">{initials}</span>
    </div>
  );
};

export default function PressPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [showAll, setShowAll] = useState(false);

  const mainstreamMentions = mediaMentions.filter((m) => m.category === "mainstream");
  const digitalMentions = mediaMentions.filter((m) => m.category === "digital");

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Media Mentions"
            description="See what the media is saying about Nyumba Zetu and our impact on property management in Kenya."
          />
        </motion.div>

        {/* Mainstream Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 md:mb-16"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-6 md:mb-8">
            Mainstream
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mainstreamMentions.map((mention, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {getOutletLogo(mention.outlet)}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                          {mention.outlet}
                        </h4>
                        {mention.date && (
                          <p className="text-xs text-slate-400 dark:text-slate-500">{mention.date}</p>
                        )}
                      </div>
                    </div>
                    <h5 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 leading-tight">
                      {mention.headline}
                    </h5>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {mention.description}
                    </p>
                    <a
                      href={mention.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                    >
                      Read story
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Show More Button (only when collapsed) */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-8 md:mt-12"
          >
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              size="lg"
              className="group"
            >
              Show more
              <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </motion.div>
        )}

        {/* Digital Section */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-12 md:mt-16"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-6 md:mb-8">
                  Digital
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {digitalMentions.map((mention, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-slate-200 dark:border-slate-700">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            {getOutletLogo(mention.outlet)}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                                {mention.outlet}
                              </h4>
                              {mention.date && (
                                <p className="text-xs text-slate-400 dark:text-slate-500">{mention.date}</p>
                              )}
                            </div>
                          </div>
                          <h5 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 leading-tight">
                            {mention.headline}
                          </h5>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                            {mention.description}
                          </p>
                          <a
                            href={mention.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                          >
                            Read story
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Show Less Button (after all mentions) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + digitalMentions.length * 0.05 }}
                  className="flex justify-center mt-8 md:mt-12"
                >
                  <Button
                    onClick={() => setShowAll(false)}
                    variant="outline"
                    size="lg"
                    className="group"
                  >
                    Show less
                    <ChevronUp className="w-4 h-4 ml-2 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}



