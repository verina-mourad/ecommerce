import { Data } from "@src/types/specificbrand";

type Props = {
  brand: Data;
};

const BrandStructuredData = ({ brand }: Props) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand?.name,
    image: brand?.image,
    url: `https://ecommerce-dxjz.vercel.app/brand/${brand?._id}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
};

export default BrandStructuredData;
