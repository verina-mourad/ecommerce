import { Button } from '@src/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cartfruits = () => {
  return <>
 <div className='md:grid gap-4 md:grid-cols-4 m-8'>
 <div className='bg-gray-100 m-4 md:col-span-2 p-7 overflow-hidden object-cover relative flex gap-3  rounded-2xl mt-2 shadow-xl'>
  
  <div className='flex flex-col gap-4 z-10'>
    <p className='text-blue-400 text-sm pt-3'>LIMITED OFFER</p>
    <p className='font-bold text-2xl'>
      Fresh Organic <br /> 
      <span className='text-blue-400'>Fruits</span>
    </p>
    <p>Nature's candy,delivered fresh</p>

    <Link href='/Product' className='group hover:text-blue-400'>
      shop Collection
      <div className='border border-black group-hover:border-blue-200 w-32 mt-1'/>
    </Link>
  </div>

  <Image
    src='/fruits.png'
    alt='Fruits'
    width={250}
    height={250}
    className='hidden md:grid md:w-40 lg:w-fit  md:absolute md:bottom-0 md:right-0 md:hover:scale-110 md:transition-transform md:duration-800 md:ease-in-out md:object-cover'
  />
</div>
  <div className='bg-blue-950 overflow-hidden m-4 p-7 md:col-span-2 relative  group flex flex-col gap-3 p-5 rounded-2xl mt-2 shadow-xl'>
        <div className='z-10'>
          <p className='text-white w-fit p-2 rounded-2xl shadow-xl bg-blue-400 text-sm'>25% OFF</p>
          <p className='font-bold text-2xl text-white'>Exotic <br /> Vegetables</p>
          <p className='text-gray-400'>Elevate your kitchen <br /> with premium greens.</p>
          <Link href='/Product' className='group/veg cursor-pointer'>
          <Button className='bg-white rounded-2xl text-black p-3 group-hover/veg:text-white group-hover/veg:bg-blue-400 cursor-pointer'>View Deals</Button>
          </Link>
        </div>
           <Image
    src='/veggies.png'
    alt='Fruits'
    width={250}
    height={250}
    className='hidden md:grid md:w-40 lg:w-fit  md:absolute md:bottom-0 md:right-0 md:hover:scale-110 md:transition-transform md:duration-800 md:ease-in-out md:object-cover'
  />

    </div>
 </div>
  </>
}

export default Cartfruits