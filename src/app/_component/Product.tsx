"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { product } from "@src/types/products";
import WishlistAddAction from "./WishlistAddAction";
import AddProductToCart from "./AddProductToCart";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  initialProducts: product[];
  totalPages: number;
}

export default function Product({ initialProducts, totalPages }: Props) {
  const [products, setProducts] = useState<any[]>(initialProducts || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts(initialProducts || []);
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
      console.error("Error fetching more products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        loadMoreProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPages]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.isArray(products) &&
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white relative group rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition hover:border hover:border-blue-400"
            >
              {/* ACTIONS */}
              <WishlistAddAction Id={product._id} />

              {/* IMAGE */}
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col gap-2">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i < Math.round(product.ratingsAverage) ? "⭐" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.ratingsAverage}
                  </span>
                </div>

                {/* Category */}
                <p className="text-sm text-blue-400">
                  {product.category?.name}
                </p>

                {/* Title */}
                <p className="font-semibold line-clamp-2">{product.title}</p>

                {/* Price */}
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-lg">${product.price}</p>

                  <AddProductToCart Id={product._id} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
