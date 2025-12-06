import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Clients - Nyumba Zetu",
  description: "Discover the trusted property management companies, estates, and organizations using Nyumba Zetu across Kenya.",
};

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

