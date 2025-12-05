import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Nyumba Zetu",
  description: "Talk to our team about how Nyumba Zetu can transform your property operations. Request a demo or get in touch.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


