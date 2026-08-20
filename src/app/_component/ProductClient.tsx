"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { LiaFilterSolid } from "react-icons/lia";
import { useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import AddProductToCart from "./AddProductToCart";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import FilterSideBar from "./FilterSideBar";
import WishlistAddAction from "./WishlistAddAction";

type Props = {
  initialProducts: any[];
  categories: any[];
  Brands: any[];
  totalPages: number;
};

const ProductClient = ({
  initialProducts,
  categories,
  Brands,
  totalPages,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedbrands, setselectedbrands] = useState<string[]>([]);

  const [products, setProducts] = useState<any[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchparams = useSearchParams();
  const query = searchparams.get("query");
  const router = useRouter();

  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
  }, [initialProducts]);

  const loadMoreProducts = async () => {
    if (loading || page >= totalPages) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?page=${nextPage}&limit=8`,
      );
      const data = await res.json();
      const newProducts = data.data || [];
      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const uniqueNewProducts = newProducts.filter(
          (p: any) => !existingIds.has(p._id),
        );
        return [...prev, ...uniqueNewProducts];
      });

      setPage(nextPage);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 300 && !loading) {
        loadMoreProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages]);

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product?.category?._id);
    const matchBrand =
      selectedbrands.length === 0 ||
      selectedbrands.includes(product?.brand?._id);
    const matchSearch =
      !query || product?.title?.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchBrand && matchSearch;
  });
  const hasProducts = filteredProducts.length > 0;
  const handleCategoryChange = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/Shop?query=${search}`);
    }
  }

  const submitSearch = () => {
    if (search.trim()) {
      router.push(`/Shop?query=${search}`);
    }
  };

  const handleBrandsChange = (id: string) => {
    setselectedbrands((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="container mx-auto w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-400 px-4 text-sm mt-2">
          Discover nature's finest organic products
        </p>

        <Button className="lg:hidden" onClick={() => setOpen(true)}>
          <LiaFilterSolid /> FILTERS
        </Button>
      </div>

      {/* SEARCH */}
      <div className="block px-4 md:col-span-5 ">
        <div className="relative w-full ">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search for products..."
            className="w-full pl-10 h-11"
          />

          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />

          <Button
            type="button"
            onClick={submitSearch}
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-blue-400 text-white px-3"
          >
            Search
          </Button>
        </div>
      </div>

      {/* FIXED LAYOUT */}
      <div className="flex w-full gap-8 ">
        {/* FILTERS */}
        <div className="hidden lg:block w-full lg:w-[25%] sticky top-24 lg:h-[calc(100vh-7rem)] self-start overflow-y-auto">
          <FilterSideBar
            setOpen={setOpen}
            categories={categories}
            Brands={Brands}
            selectedCategories={selectedCategories}
            selectedbrands={selectedbrands}
            handleCategoryChange={handleCategoryChange}
            handleBrandsChange={handleBrandsChange}
          />
        </div>

        {/* PRODUCTS */}
        <main className="w-full lg:w-[75%] min-w-0 ">
          <div className="flex p-4 items-center gap-2 w-full">
            <p>FILTERS:</p>
            <p>search: {query}</p>
            <Link href={"/Shop"} className="text-red-400 cursor-pointer">
              <FaTrashAlt />
            </Link>
          </div>

          {hasProducts ? (
            <>
              <div className="w-full grid grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white relative group rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition hover:border hover:border-blue-400"
                  >
                    <WishlistAddAction Id={product._id} />

                    <div className="relative w-full h-60 overflow-hidden">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                              {i < Math.round(product.ratingsAverage)
                                ? "⭐"
                                : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {product.ratingsAverage}
                        </span>
                      </div>

                      <p className="text-sm text-blue-400">
                        {product.category.name}
                      </p>

                      <p className="font-semibold line-clamp-2">
                        {product.title}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <p className="font-bold text-lg">${product.price}</p>
                        <AddProductToCart Id={product._id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* رسالة التحميل لما السكرول يوصل للآخر ويجيب بيانات جديدة */}
              {loading && (
                <div className="text-center py-8 text-blue-500 font-medium">
                  Loading more products...
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-400">Oops!</p>
                <p className="text-gray-500 mt-2">No products found</p>
                <Link href={"/Shop"}>
                  <Button className="hover:bg-blue-400 cursor-pointer">
                    Reset filters
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER */}
      {open && (
        <div className="fixed inset-0 mt-6 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 mt-4 top-0 w-2/3 h-full bg-white p-4">
            <div className="lg:hidden w-full mt-3">
              <FilterSideBar
                setOpen={setOpen}
                categories={categories}
                Brands={Brands}
                selectedCategories={selectedCategories}
                selectedbrands={selectedbrands}
                handleCategoryChange={handleCategoryChange}
                handleBrandsChange={handleBrandsChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductClient;
