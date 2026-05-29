import Image from 'next/image'
import Link from 'next/link'
import Product from './_component/Product'
import Cartfruits from './_component/Cartfruits'
import CategoriesGrid from './_component/CategoriesGrid'
import Footer from './_component/Footer'

export default function page() {
  return <>
 <div className='bg-gray-100/50 '>
   <div className='container mx-auto px-2 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between'>
    <div className='flex flex-col gap-5 order-2 lg:order-1 lg:w-3/6'>
      <div className='bg-gray-100 w-fit p-2 rounded-2xl order-2 lg:order-1 shadow-2xl flex items-center gap-2'>
        <div className='bg-green-600 rounded-2xl w-2 h-2'/>
        <p >NEW COLLECTION 2026</p>
    </div>
    <p className='font-bold text-5xl lg:text-6xl order-2 lg:order-1'>Elevate Your <span className='text-blue-400'>Lifestyle </span>
     <br /> With Far Mart
    </p>
    <p className='text-gray-400 order-3 lg:order-3'>Enjoy fresh products delivered straight to your door with fast 
      <br />
      and free delivery. Shop now and get 20% off!
    </p>
    <div className='flex gap-4 order-4'>
      <button className='bg-blue-950 rounded-2xl py-4 px-6 text-white'><Link href='/home'>shop collection</Link></button>
      <button className='bg-white shadow-xl rounded-2xl py-4 px-6'><Link href='/home'>view Deals</Link></button>
    </div>
    <hr className=' border-gray-300 order-5'/>
    <div className='flex gap-8 order-6'>
       <p className='font-bold text-2xl'>12k+ <br /> <span className='text-gray-300 text-sm'>HAPPY CUSTOMERS</span></p>
    <div className='w-px h-10 bg-gray-300'></div>   
     <p className='font-bold text-2xl'>4.9/5 <br /><span className='text-gray-300 text-sm'>STORE RATING</span></p>

    </div>
    </div>
    
<div className="relative z-0 hidden md:block md:w-full lg:w-auto md:p-5 lg:p-1 md:order-1 lg:order-2 lg:order-1">
  <div>
    <Image
      className="w-full md:w-[764.4px] rounded-2xl lg:w-[750px] h-[450px]"
      src="/image (1).png"
      alt="shopping image"
      width={400}
      height={400}
    />

  <div className='bg-gray-100 shadow-2xl rounded-full w-fit p-1 absolute top-0 z-100 -right-4  '>
    <p className='text-white bg-blue-400 rounded-full rotate-20 p-3'>SAVE <br /> <span className='font-bold'>20%</span></p>
  </div>
  </div>

</div>
  </div>
 </div>
 <CategoriesGrid/>
<Cartfruits/>
 <Product/>
 <Footer/>
  </>
}
