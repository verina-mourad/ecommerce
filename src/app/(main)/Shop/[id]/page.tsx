import ProductDetailsClient from "@src/app/_component/ProductDetailsClient";
import { Metadata } from "next";
type ProductPageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`,
  );
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.data;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
  return {
    title: `${product.title} - Product Page`,
    description: `Explore details of ${product.title}.`,
  };
}

export default async function Page({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return <ProductDetailsClient product={product} />;
}
