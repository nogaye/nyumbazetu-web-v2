"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { mainClients, allClients, IClient } from "@/lib/clients-data";

function ClientsPage() {
  const allClientsList = [...mainClients, ...allClients];

  // Group clients by location
  const clientsByLocation = allClientsList.reduce((acc, client) => {
    const location = client.location || "Other";
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(client);
    return acc;
  }, {} as Record<string, IClient[]>);

  const locations = Object.keys(clientsByLocation).sort();

  return (
    <>
      <Section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 pt-16 md:pt-20 lg:pt-24">
        <SectionHeader
          title="Our Trusted Clients"
          description="Join hundreds of property management companies, estates, and organizations across Kenya who trust Nyumba Zetu to streamline their operations and deliver exceptional tenant experiences."
        />
      </Section>

      <Section>
        <div className="container mx-auto px-4">
          {/* Featured Clients */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">
              Featured Clients
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Leading property management companies and estates using Nyumba Zetu
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainClients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-50 mb-1 text-center">
                        {client.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                        {client.location}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* All Clients by Location */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8 text-center">
              All Our Clients
            </h2>
            {locations.map((location, locationIndex) => (
              <div key={location} className="mb-12">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-primary rounded-full"></span>
                  {location}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {clientsByLocation[location].map((client, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (locationIndex * 0.1) + (index * 0.05) }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-4">
                          <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-lg mb-3 flex items-center justify-center p-3">
                            <Image
                              src={`/legacy/images/clients/${client.imageUrl}`}
                              alt={client.name || ""}
                              width={120}
                              height={120}
                              className="w-full h-full object-contain"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 120px"
                              loading="lazy"
                            />
                          </div>
                          <h5 className="font-semibold text-sm text-slate-900 dark:text-slate-50 mb-1 text-center">
                            {client.name}
                          </h5>
                          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                            {client.location}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

export default ClientsPage;

