'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdArrowForwardIos } from 'react-icons/md'

import React from 'react'

const OrderLinks = () => {
      const path = usePathname()

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
        href="/Cart"
        className={`flex items-center gap-1 hover:text-blue-400 ${
          path === '/Cart' ? 'text-blue-500 font-semibold' : ''
        }`}
      >
        My Orders
         <MdArrowForwardIos />
      </Link>

  

    </div>
  </>
}

export default OrderLinks