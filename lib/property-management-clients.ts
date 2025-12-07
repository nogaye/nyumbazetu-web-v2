export interface IPropertyManagementClient {
  name: string;
  imageUrl?: string;
  location?: string;
}

// Property Management Companies with their logos
export const propertyManagementClients: IPropertyManagementClient[] = [
  {
    name: "Epic Properties Ltd",
    imageUrl: "https://app.nyumbazetu.com/assets/images/branches/epic-properties.png",
  },
  {
    name: "Realty Plus Ltd",
    imageUrl: "https://app.nyumbazetu.com/assets/images/branches/reality_plus.png",
  },
  {
    name: "MySpace Properties Ltd",
    imageUrl: "https://app.nyumbazetu.com/assets/images/branches/myspace.png",
  },
  {
    name: "Bustani Holdings Ltd",
    imageUrl: "https://app.nyumbazetu.com/assets/images/branches/palm-hub.png",
  },
  {
    name: "Unique Castle",
    imageUrl: "https://app.nyumbazetu.com/assets/images/branches/unique-castle.png",
  },
  {
    name: "New Court Company",
    imageUrl: "https://app.nyumbazetu.com/assets/images/logo/logo_hor.png",
  },
  {
    name: "George Padmore Rose Management Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/178893/6a658ce9-1519-4151-86c0-5c6776026b09-george_padmore_logo.jpeg",
  },
  {
    name: "Beza Trading Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/178998/96c23159-5b79-483d-a555-6413726b9e93-beza-logo.jpeg",
  },
  {
    name: "Markhamia Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/179234/d1624db5-bf1a-4963-8ca7-91f9f5ecfae6-mayner-logo.jpeg",
  },
  {
    name: "Umbrella Property Managers Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/179643/8efa9e66-2c70-4e51-b17b-daf365114a4a-umbrella_logo.png",
  },
  {
    name: "Buxton Point Property Management Ltd",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/179826/5a188bfc-4361-404e-9242-e908aae7ec80-buxton_point_logo.png",
  },
  {
    name: "Hlehi Homes",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/180478/6dabaf4a-2837-40f2-89c0-b45ea0f655fb-hlehi-logo.png",
  },
  {
    name: "360 Degrees Court Phase 1",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/63bd3022-276d-4f73-b5c5-71cca5cde55a-360courtapartments-logo.jpeg",
  },
  {
    name: "Fourways Junction Residents Association",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/181157/fba8ec57-f5b0-492e-a9e3-a945bb7038b9-fourways_logo.png",
  },
  {
    name: "Odum Investments",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/181966/46c917d0-fb11-4e7a-ba94-e74fd1ec4be1-odum-investments-logo.png",
  },
  {
    name: "Lisawoods Homes Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/5565591d-65c8-4d35-8059-db6c0d3f6956-lisawoods_logo.png",
  },
  {
    name: "Premier Real Estates Ltd",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/3b66f135-9f1e-4526-8cf5-ef817f951413-premier-realestates-logo.jpg",
  },
  {
    name: "Eden Heights Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/e494b1f1-b5eb-4cf4-b1aa-d9a701aafda1-eden-heights-realty-logo.png",
  },
  {
    name: "Residency Owners' Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/2cf74ffb-5cb7-4356-bae1-003d1b49a107-residency_africa_logo.png",
  },
  {
    name: "HFDI",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/3356c602-ae0c-478d-9325-0a094e40c653-hfc_logo.png",
  },
  {
    name: "Megna Property Management Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/1/5e0b22a9-14a8-49da-87c1-39408ec8ee05-megna_logo.jpeg",
  },
  {
    name: "Alina Harbour Management Company Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/aee4e67b-10d5-4b1b-9d34-8817532893c0-alina_harbour_logo.png",
  },
  {
    name: "Erdemann Property Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/8fdc0d1d-648e-4e28-acd4-f7984e356392-edermann_logo.jpg",
  },
  {
    name: "Sunland Real Estates Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/7c5f2fc0-df08-4dff-a631-05ca8db935c6-sunland_logo.jpeg",
  },
  {
    name: "Blintchad Investments Company Limited",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/510d9898-c2bf-4afe-b268-df2161244af2-blintchad_logo.jpeg",
  },
  {
    name: "Xquisite Real Estate Corp. Ltd.",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/5cb3264f-5592-4f8f-9a6b-f75724096a80-xquisite_logo.jpeg",
  },
  {
    name: "Nicestay Homes International",
    imageUrl: "https://nyumba-zetu-bucket.s3.amazonaws.com/4/05c0f080-9254-4d72-a9fa-143c9285270a-nicestay_logo.jpeg",
  },
  // Companies without logos (will be displayed with text only)
  {
    name: "New Court Management Company",
    imageUrl: "https://app.nyumbazetu.com/assets/images/branches/urban_oasis_no_bg.png",
  },
  {
    name: "Redrose Gardens Limited",
  },
  {
    name: "Acute Realtors Ltd",
  },
  {
    name: "Sondr Consult Ltd",
  },
  {
    name: "Tree Shade Shelter Ltd",
  },
  {
    name: "Lantern Hostels",
  },
  {
    name: "Pearl Hills Entreprise",
  },
  {
    name: "Rama Homes Ltd",
  },
  {
    name: "Landmark East Africa Limited",
  },
  {
    name: "Zurafa Properties",
  },
  {
    name: "Millennium Krishna Apartments Ltd",
  },
  {
    name: "Zenith (v) Management LTD",
  },
  {
    name: "Markie Investments LTD",
  },
  {
    name: "Edwam Merchants",
  },
  {
    name: "Josephine Apartments",
  },
  {
    name: "Homes Go Ltd",
  },
  {
    name: "Astoria Apartments",
  },
  {
    name: "TG Kawa Limited",
  },
  {
    name: "Hotani Owners' Management Limited",
  },
  {
    name: "Ndemi Garden Limited",
  },
  {
    name: "Schnookums Company Limited",
  },
  {
    name: "GATC & Riara House",
  },
  {
    name: "Ecologic Property Services Limited",
  },
  {
    name: "Jobe Lifestyle Corner",
  },
  {
    name: "Ruby Apartments",
  },
  {
    name: "Rinyu Limited",
  },
  {
    name: "Zurafa Properties Limited",
  },
];

// Featured property management companies (with logos) for carousel
export const featuredPropertyManagementClients = propertyManagementClients.filter(
  (client) => client.imageUrl
).slice(0, 8); // Top 8 with logos for featured carousel

