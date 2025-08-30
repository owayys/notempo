import { Metadata } from "next";

type SeoArgs = {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
};

export const seo = ({
  title,
  description,
  keywords,
  image,
}: SeoArgs): Metadata => {
  return {
    title,
    description,
    keywords: keywords ? [keywords] : undefined,
    openGraph: {
      type: "website",
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      creator: "@tannerlinsley",
      site: "@tannerlinsley",
      images: image ? [image] : undefined,
    },
  };
};
