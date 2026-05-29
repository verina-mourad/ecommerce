import AddProductToCart from '@src/app/_component/AddProductToCart'
import BrandsLinks from '@src/app/_component/BrandsLinks'
import ProductClient from '@src/app/_component/Product'
import WishlistAddAction from '@src/app/_component/WishlistAddAction'
import { Button } from '@src/components/ui/button'
import { Data, Welcome } from '@src/types/specificbrand'
import Image from 'next/image'
import React from 'react'
import { FaCircle } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params

  const brandRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${id}`)
  const brandData: Welcome = await brandRes.json()
  const brand: Data = brandData.data

  const productsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const productsData = await productsRes.json()
type Product = {
  _id: string
  title: string
  imageCover: string
  price: number
  ratingsAverage: number
  category: { name: string }
  brand?: { _id: string }
}
  const products:Product[] = productsData.data.filter(
    (p: any) => p.brand?._id === id
  )

  return (<>
  
    <div>
      <div className="container mx-auto px-4 flex items-center justify-between gap-6 mb-6">
        <div className='flex flex-col'>
        <Image src={brand.image} alt={brand.name} width={200} height={200}  />
        <h2 className='text-blue-300'>Official</h2>
        </div>
        
<Image
  src={brand.image}
  alt={brand.name}
  width={80}
  height={80}
  className="object-cover rounded"
/>   
   </div>
<div className='container mx-auto px-4 flex items-center gap-2'>
<p className='flex items-center gap-2 text-sm'>
  <FaCircle style={{ color: "#16a34a" }} className='animate-pulse' />
  ACTIVE SELECTION
</p>
<Button className='py-2 flex items-center gap-2 transition-transform duration-300 hover:animate-pulse'>  {brand.name}

  <IoMdClose className='transition-colors hover:text-blue-400' />
</Button>
</div>
<div>
  </div>       
    </div>
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
  </>
  )
}