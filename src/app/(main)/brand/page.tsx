'use client'
import BrandsLinks from '@src/app/_component/BrandsLinks'
import { BrandsProduct } from '@src/types/brand'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdArrowForwardIos } from 'react-icons/md'

export default function Page() {
  const [Brands, setBrands] = useState<BrandsProduct[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/brands`
        )

        const data = await res.json()
        setBrands(data.data)

      } catch (error) {
        console.log("Error:", error)
      }
    }

    fetchBrands()
  }, [])

  return (
    <div className='container mx-auto'>
      <BrandsLinks brands={Brands} />
      <h2 className='font-bold text-2xl'>
        Premium <span className='text-blue-400'>brands</span>
      </h2>

      <p className='text-gray-400'>Shop from your favorite brands</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {Brands.map((brand) => (
          <div key={brand._id} className='flex flex-col'>
            <Link
              href={`/brand/`+brand._id}
              className='bg-gray-100 group flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-2'
            >
              <div className="relative w-24 h-24 bg-white p-3 rounded-2xl overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-all duration-300"
                />
              </div>

              <p className='text-2xl font-bold group-hover:text-blue-400'>
                {brand.name}
              </p>

              <p className='flex items-center gap-1 text-gray-400 text-xs group-hover:text-blue-400'>
                VIEW COLLECTION <MdArrowForwardIos />
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}