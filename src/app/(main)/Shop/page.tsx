import { getCategories } from "@src/services/getcategories";
import { getProducts } from "@src/services/getproduct";
import ProductClient from "@src/app/_component/ProductClient";
import getBrands from "@src/services/getBrands";

export const dynamic = "force-dynamic";

const Page = async () => {
  const { products, metadata } = await getProducts(1, 8);
  const categories = await getCategories();
  const Brands = await getBrands();

  return (
    <ProductClient
      initialProducts={products}
      categories={categories}
      Brands={Brands}
      totalPages={metadata.numberOfPages || 1}
    />
  );
};

export default Page;
