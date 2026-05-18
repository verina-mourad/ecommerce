'use client'
import { Button } from '@src/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaHeart, FaRegHeart, FaShoppingBag } from 'react-icons/fa'

const WhishlistEmpty = () => {
     
  return <>
   <div className='flex text-center items-center min-h-screen justify-center'>
    <div className='flex flex-col gap-5'>
      <div className='bg-blue-200 w-fit p-4 mx-auto rounded-full relative'>
        <FaRegHeart className='text-blue-400 animate-pulse size-12'/>
        <FaHeart className='absolute -top-3 animate-bounce -right-2 text-blue-300'/>
      </div>
    <h2 className='text-2xl font-bold'>Your Wishlist is <span className='text-blue-400'>Empty</span></h2>
    <p>Looks like you haven't added anything to your wishlist yet.<br/> Start exploring our amazing products and save your <br/> favorites!</p>
    <Link href={'/'}> <Button className='text-white cursor-pointer bg-blue-400 w-fit p-5 mx-auto'><FaShoppingBag/> START SHOPING NOW</Button></Link>
    </div>
   </div>
  </>
}

export default WhishlistEmpty