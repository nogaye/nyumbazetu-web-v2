import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Nyumba Zetu",
  description: "Get in touch with the Nyumba Zetu team. Send a message, find our office, or reach us by phone or email.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


