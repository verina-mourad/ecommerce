'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdArrowForwardIos } from 'react-icons/md'

import React from 'react'

const CategoryLinks = () => {
      const path = usePathname()
      const segments=path.split('/').filter(Boolean)

  return <>
   <div className="flex items-center gap-2 text-xs m-4">

      <Link
        href="/"
        className={`flex items-center gap-1 hover:text-blue-400 ${
          path === '/' ? 'text-blue-500 font-semibold' : ''
        }`}
      >
        HOME <MdArrowForwardIos />
      </Link>
      <Link
        href="/Categories"
        className={`flex items-center gap-1 hover:text-blue-400 ${
          path === '/Categories' ? 'text-blue-500 font-semibold' : ''
        }`}
      >
          Categories
      </Link>

   

  

    </div>
  </>
}

export default CategoryLinks