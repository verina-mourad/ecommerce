import BrandsClient from "./BrandsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ecommerce-dxjz.vercel.app"),
  title: "Brands",
  description:
    "Explore a wide range of brands and their products. Discover the latest trends, top-rated brands, and exclusive collections. Find your favorite brands and shop with confidence.",
  openGraph: {
    title: "Brands",
    description:
      "Explore a wide range of brands and their products. Discover the latest trends, top-rated brands, and exclusive collections. Find your favorite brands and shop with confidence.",
    url: "/brand",
    siteName: "My Brand",
    images: [
      {
        url: "/images/brands.jpg",
        width: 1200,
        height: 630,
        alt: "My Shop Brands",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brands",
    description:
      "Explore a wide range of brands and their products. Discover the latest trends, top-rated brands, and exclusive collections. Find your favorite brands and shop with confidence.",
    creator: "@ecommerce",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  return <BrandsClient />;
}
