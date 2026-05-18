'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdArrowForwardIos } from 'react-icons/md'

import React from 'react'
import { BrandsProduct } from '@src/types/brand'
import { Data } from '@src/types/specificbrand'

const BrandsLinks = ({brands}:{brands:BrandsProduct[]}) => {
  const path = usePathname()
  const specificBrands = path.split('/').filter(Boolean)
const getName = (id:string) => {
  const item = brands.find((b) => b._id === id)
  return item?.name
}

  return (
    <div className="flex items-center gap-2 text-xs m-4">
      
      <Link
        href="/"
        className={`flex items-center gap-1 hover:text-blue-400 ${
          path === '/' ? 'text-blue-500 font-semibold' : ''
        }`}
      >
        HOME <MdArrowForwardIos />
      </Link>

      {specificBrands.map((segment, index) => {
        const href = '/' + specificBrands.slice(0, index + 1).join('/')

        return (
          <Link
            href={href}
            key={href}
            className="flex items-center gap-1 hover:text-blue-400"
          >
           {segment}

            {/* ⛔ fix here */}
            {index !== specificBrands.length - 1 && (
              <MdArrowForwardIos />
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default BrandsLinks