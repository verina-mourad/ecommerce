import { Button } from '@src/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'

const CartEmpty = () => {
  return <>
     <div className='flex text-center items-center min-h-screen justify-center'>
      <div className='flex flex-col gap-5'>
        <div className='bg-blue-100 w-fit p-4 mx-auto rounded-full relative'>
          <IoMdCart className='text-blue-300 animate-pulse size-24'/>
        <FaPlus className='absolute bottom-4 animate-bounce -right-2 text-blue-300'/>
        </div>
      <h2 className='text-2xl font-bold'>Your Cart is <span className='text-blue-400'>Feeling Lonely</span></h2>
      <p className='text-gray-400'>Your shopping bag is currently empty. Don't let the best deals<br/> slip away! Explore our latest arrivals and fill it with joy. <br/> favorites!</p>
      <div className='flex items-center gap-1 '>
         <Button  className='text-white bg-blue-400 p-5 mx-auto cursor-pointer'><Link href='/'>GO SHOPPING</Link></Button>
      <Button  className=' bg-white cursor-pointer text-black border-blue-300 p-5 mx-auto'> <Link href='/whishlist'>CHECK WISHLIST</Link></Button>

      </div>
      </div>
     </div>
  </>
}

export default CartEmpty