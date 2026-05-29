import React from 'react'
import Image from 'next/image'
import { BsCart3 } from 'react-icons/bs'
import { product } from '@src/types/products'
import { Button } from '@src/components/ui/button'
import { getProducts } from '@src/services/getproduct'
import CartAction from './WishlistAddAction'
import WishlistAddAction from './WishlistAddAction'
import { IoMdCart } from 'react-icons/io'
import { AddCart } from '@src/CartAction/CartAction'
import AddProductToCart from './AddProductToCart'
export const dynamic = "force-dynamic";
export default async function ProductClient() {
  const products: product[] = await getProducts()


  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white relative group rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition hover:border hover:border-blue-400"
          >

            {/* ACTIONS (Client Component عادي) */}
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
                      {i < Math.round(product.ratingsAverage) ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.ratingsAverage}
                </span>
              </div>

              {/* Category */}
              <p className="text-sm text-blue-400">
                {product.category.name}
              </p>

              {/* Title */}
              <p className="font-semibold line-clamp-2">
                {product.title}
              </p>

              {/* Price */}
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold text-lg">
                  ${product.price}
                </p>

               <AddProductToCart Id={product._id}/>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}