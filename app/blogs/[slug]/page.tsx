import { Section } from "@/components/section";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In production, fetch blog data here
  return {
    title: "Blog Post - Nyumba Zetu",
    description: "Read our latest blog post",
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In production, fetch blog data based on slug
  // For now, return not found
  notFound();
}


