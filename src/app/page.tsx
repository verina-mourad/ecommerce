import Image from "next/image";
import Link from "next/link";
import Product from "./_component/Product";
import Cartfruits from "./_component/Cartfruits";
import CategoriesGrid from "./_component/CategoriesGrid";
import Footer from "./_component/Footer";
import { getProducts } from "@src/services/getproduct";

async function getInitialProducts() {
  try {
    const data = await getProducts(1, 8);
    return {
      products: data.products || [],
      // استخراج إجمالي عدد الصفحات من الـ metadata حسب هيكلة API الخاص بك
      totalPages: data.metadata?.numberOfPages || 1,
    };
  } catch (error) {
    console.error("Error fetching initial products:", error);
    return { products: [], totalPages: 1 };
  }
}

export default async function Page() {
  const { products, totalPages } = await getInitialProducts();

  return (
    <>
      <div className="bg-gray-100/50 ">
        <div className="container mx-auto p-4 p flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-5 order-2 lg:order-1 lg:w-3/6">
            <div className="bg-gray-200 mx-4 w-fit p-2 rounded-2xl order-2 lg:order-1 shadow-2xl flex items-center gap-2">
              <div className="bg-green-600 rounded-2xl w-2 h-2" />
              <p>new Collection</p>
            </div>
            <p className="font-bold px-4 text-5xl lg:text-6xl order-2 lg:order-1">
              elevate Your <span className="text-blue-400">lifestyle</span>
              <br /> with Far Mart
            </p>
            <p className="px-4 text-gray-400 order-3 lg:order-3">
              enjoy Products
              <br />
              free Delivery Info
            </p>
            <div className="flex px-4 gap-4 order-4">
              <button className="bg-blue-950 rounded-2xl py-4 px-6 text-white">
                <Link href="/home" className="px-4">
                  shop Collection
                </Link>
              </button>
              <button className="bg-white shadow-xl rounded-2xl py-4 px-6">
                <Link href="/home">view Deals</Link>
              </button>
            </div>
            <hr className=" border-gray-300 order-5" />
            <div className="flex gap-8 order-6">
              <p className="font-bold px-4 text-2xl">
                12k+ <br />{" "}
                <span className="text-gray-300 text-sm">happy Customers</span>
              </p>
              <div className="w-px h-10 bg-gray-300"></div>
              <p className="font-bold px-4 text-2xl">
                4.9/5 <br />
                <span className="text-gray-300 text-sm">store Rating</span>
              </p>
            </div>
          </div>

          <div className="relative px-4 z-0 hidden md:block md:w-full lg:w-auto md:p-5 lg:p-1 md:order-1 lg:order-2">
            <div>
              <Image
                className="w-full md:w-[764.4px] rounded-2xl lg:w-[750px] h-[450px]"
                src="/image (1).png"
                alt="shopping image"
                width={400}
                height={400}
              />

              <div className="bg-gray-100 shadow-2xl rounded-full w-fit p-1 absolute top-0 z-100 -right-4  ">
                <p className="text-white bg-blue-400 rounded-full rotate-20 p-3">
                  SAVE <br /> <span className="font-bold">20%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategoriesGrid />
      <Cartfruits />
      <Product initialProducts={products} totalPages={totalPages} />
      <Footer />
    </>
  );
}
