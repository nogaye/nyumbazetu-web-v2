"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/section";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface IClient {
  id?: number;
  name?: string;
  location?: string;
  imageUrl?: string;
  website?: string;
}

export function LegacyClients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 300;

  const clients: IClient[] = [
    {
      imageUrl: "aqua_viva.png",
      name: "Aqua Viva",
      location: "Nairobi",
    },
    {
      imageUrl: "asmin_court.png",
      name: "Asmin Court",
      location: "Nairobi",
    },
    {
      imageUrl: "baobab_plaza.png",
      name: "Baobab Plaza",
      location: "Nairobi",
    },
    {
      imageUrl: "city_house.png",
      name: "City House",
      location: "Mombasa",
    },
    {
      imageUrl: "cowrie_shells.png",
      name: "Cowrie Shells",
      location: "Mombasa",
    },
    {
      imageUrl: "latana_galu_beach.png",
      name: "Latana Galu Beach",
      location: "Mombasa",
    },
    {
      imageUrl: "links_plaza.png",
      name: "Links Plaza",
      location: "Nairobi",
    },
    {
      imageUrl: "micd_building.png",
      name: "MICD Building",
      location: "Nairobi",
    },
    {
      imageUrl: "mwewe_apartments.png",
      name: "Mwewe Apartments",
      location: "Mombasa",
    },
    {
      imageUrl: "pearl_residence.png",
      name: "Pearl Residence",
      location: "Mombasa",
    },
    {
      imageUrl: "rose_apartment.png",
      name: "Rose Apartment",
      location: "Nairobi",
    },
    {
      imageUrl: "royal_beach_apartments.png",
      name: "Royal Beach Apartments",
      location: "Mombasa",
    },
    {
      imageUrl: "serena_apartments.png",
      name: "Serena Apartments",
      location: "Nairobi",
    },
    {
      imageUrl: "silver_harbour.png",
      name: "Silver Harbour",
      location: "Mombasa",
    },
    {
      imageUrl: "silverstone_apartments.png",
      name: "Silverstone Apartments",
      location: "Nairobi",
    },
    {
      imageUrl: "sohail_residency.png",
      name: "Sohail Residency",
      location: "Mombasa",
    },
    { imageUrl: "the_shaza.png", name: "The Shaza", location: "Nairobi" },
    {
      imageUrl: "valley_view_office_park.png",
      name: "Valley View Office Park",
      location: "Nairobi",
    },
    {
      imageUrl: "water_club_nyali.png",
      name: "Water Club Nyali",
      location: "Mombasa",
    },
  ];

  const mainClients = [
    {
      imageUrl: "main/urban_oasis.png",
      name: "Urban Oasis Apartments",
      location: "Lavington, Nairobi",
    },
    {
      imageUrl: "main/360_degrees.png",
      name: "360 Degrees",
      location: "Syokimau, Nairobi",
    },
    {
      imageUrl: "main/buxton.png",
      name: "Buxton Point",
      location: "Mombasa",
    },
    {
      imageUrl: "main/epic_properties.png",
      name: "Epic Properties",
      location: "Nairobi",
    },
    {
      imageUrl: "main/fourways.png",
      name: "Fourways Junction",
      location: "Kiambu",
    },
    {
      imageUrl: "main/perrywest.png",
      name: "Perry West",
      location: "Kilimani, Nairobi",
    },
    {
      imageUrl: "main/riverside.png",
      name: "River Side Apartments",
      location: "Nairobi",
    },
    {
      imageUrl: "main/roseville.png",
      name: "Roseville Apartments",
      location: "Nairobi",
    },
  ];

  const combinedClients = [...mainClients, ...mainClients];

  useEffect(() => {
    const totalItems = mainClients.length;
    const scrollInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === totalItems - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(scrollInterval);
  }, [mainClients.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mainClients.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + mainClients.length) % mainClients.length
    );
  };

  return (
    <Section className="bg-slate-50 dark:bg-slate-900 py-5 client-section">
      <div className="container mx-auto px-4 text-center">
        <h3 className="mb-3 text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">
          Some Of Our Happy 😊 Clients
        </h3>
        <p className="text-lg text-dark dark:text-slate-300 mb-5 px-4 md:px-5">
          Join the community of successful clients using{" "}
          <strong className="text-primary">Nyumba Zetu</strong>. From bustling
          commercial centers in Nairobi to serene residential complexes in
          Lavington, our software has been the backbone of successful property
          management strategies.
        </p>

        {/* Carousel Wrapper */}
        <div className="carousel-container position-relative mb-5">
          {/* Arrow Controls */}
          <Button
            variant="outline"
            size="icon"
            className="carousel-arrow left absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={prevSlide}
          >
            ←
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="carousel-arrow right absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={nextSlide}
          >
            →
          </Button>

          <div
            className="carousel-track flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
            }}
          >
            {combinedClients.map((client, index) => (
              <div
                key={index}
                className="client-card-large mx-2 flex-shrink-0"
                style={{ width: `${itemWidth}px` }}
              >
                <div className="image-wrapper-large gradient-hover rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={`/legacy/images/clients/${client.imageUrl}`}
                    alt={client.name || ""}
                    width={300}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-semibold mt-3 mb-1 text-dark dark:text-slate-50">
                  {client.name}
                </p>
                <small className="text-muted dark:text-slate-400">
                  {client.location}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* Small clients */}
        <div className="flex overflow-auto justify-center gap-4 px-3 flex-wrap">
          {clients.map((client, index) => (
            <div
              key={index}
              className="client-card-small text-center flex-shrink-0"
            >
              <div className="image-wrapper-small gradient-hover rounded-lg overflow-hidden shadow-sm p-2 bg-white dark:bg-slate-800">
                <Image
                  src={`/legacy/images/clients/${client.imageUrl}`}
                  alt={client.name || ""}
                  width={120}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-semibold mt-2 mb-1 text-dark dark:text-slate-50 text-sm">
                {client.name}
              </p>
              <small className="text-muted dark:text-slate-400 text-xs">
                {client.location}
              </small>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

