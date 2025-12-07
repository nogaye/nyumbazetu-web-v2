"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { mainClients, allClients, IClient } from "@/lib/clients-data";
import { propertyManagementClients } from "@/lib/property-management-clients";

function ClientsPage() {
  // Combine all client types
  const allClientsList = [...mainClients, ...allClients];
  
  // Helper function to check if URL is external
  const isExternalUrl = (url?: string) => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  };

  // Normalize location for grouping
  const normalizeLocation = (location: string): string => {
    if (!location) return "Other";
    
    // Syokimau is in Machakos, not Nairobi
    if (location.toLowerCase().includes("syokimau")) {
      return "Machakos";
    }
    
    // Extract main city from locations like "Kilimani, Nairobi" or "Lavington, Nairobi"
    if (location.includes(",")) {
      const parts = location.split(",").map(p => p.trim());
      const city = parts[parts.length - 1];
      
      // If it ends with "Nairobi", group under "Nairobi"
      if (city.toLowerCase() === "nairobi") {
        return "Nairobi";
      }
      
      return city;
    }
    
    return location;
  };

  // Group clients by normalized location
  const clientsByLocation = allClientsList.reduce((acc, client) => {
    const normalizedLocation = normalizeLocation(client.location || "Other");
    if (!acc[normalizedLocation]) {
      acc[normalizedLocation] = [];
    }
    acc[normalizedLocation].push(client);
    return acc;
  }, {} as Record<string, IClient[]>);

  // Sort locations: Nairobi, Mombasa, Kiambu, Machakos, then others alphabetically
  const locationOrder = ["Nairobi", "Mombasa", "Kiambu", "Machakos"];
  const locations = Object.keys(clientsByLocation).sort((a, b) => {
    const indexA = locationOrder.indexOf(a);
    const indexB = locationOrder.indexOf(b);
    
    // If both are in the predefined order, sort by their index
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only A is in the order, it comes first
    if (indexA !== -1) return -1;
    
    // If only B is in the order, it comes first
    if (indexB !== -1) return 1;
    
    // If neither is in the order, sort alphabetically
    return a.localeCompare(b);
  });

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
          {/* Featured Property Management Companies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">
              Property Management Companies
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Leading property management companies and estates using Nyumba Zetu
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {propertyManagementClients.map((client, index) => {
                const imageSrc = isExternalUrl(client.imageUrl)
                  ? client.imageUrl!
                  : client.imageUrl
                  ? `/legacy/images/clients/${client.imageUrl}`
                  : null;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-4">
                        {imageSrc ? (
                          <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-lg mb-3 flex items-center justify-center p-3">
                            <Image
                              src={imageSrc}
                              alt={client.name || ""}
                              width={120}
                              height={120}
                              className="w-full h-full object-contain"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 120px"
                              loading="lazy"
                              unoptimized={isExternalUrl(client.imageUrl)}
                            />
                          </div>
                        ) : (
                          <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-3 flex items-center justify-center p-3">
                            <div className="text-center">
                              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                                <span className="text-lg font-bold text-primary">
                                  {client.name?.charAt(0) || "?"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        <h5 className="font-semibold text-sm text-slate-900 dark:text-slate-50 mb-1 text-center line-clamp-2">
                          {client.name}
                        </h5>
                        {client.location && (
                          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                            {client.location}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Featured Property Estates */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 text-center">
              Featured Property Estates
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Leading property estates and residential complexes using Nyumba Zetu
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
              More of Our Clients
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

