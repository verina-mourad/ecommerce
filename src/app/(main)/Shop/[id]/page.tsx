'use client'

import AddSpecialProduct from '@src/app/_component/AddSpecialProduct'
import { Button } from '@src/components/ui/button'
import { ProductDetails } from '@src/types/specifiShop'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleLeft, FaCartArrowDown, FaRegHeart } from 'react-icons/fa'

const Page = () => {
  const params = useParams()
  const id = params.id as string

  const [product, setProduct] = useState<ProductDetails | null>(null)
  const [mainImage, setmainImage] = useState('')

useEffect(() => {
  if (product?.images?.length) {
    setmainImage(product.images[0])
  }
}, [product])
  async function getspecificProduct() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`
      )
      const data = await res.json()
      setProduct(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) getspecificProduct()
  }, [id])
if (!product) {
  return <div className="container mx-auto">Loading...</div>
}
  return <>
     <div className='container mx-auto'>
       <Link href={'/Shop'} className=' flex items-center gap-2 cursor-pointer '>
          <FaArrowAltCircleLeft className='text-gray-400 hover:border hover:border-2 hover:border-blue-400 hover:rounded-2xl' />
        <p className='text-gray-400'>BACK</p>
      </Link>

      <div className='bg-white p-4 lg:flex items-center justify-center'>
        {/*images*/}
      <div className='space-y-4 mx-8' >
 {mainImage && (
  <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
    <Image
      src={mainImage}
      alt={product?.title || 'product'}
      fill
      className="object-cover transition-transform duration-300 hover:scale-110"
    />
  </div>
)}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {product?.images?.map((img: string, i: number) => (
    <div
      key={i}
      className="w-24 h-24 relative overflow-hidden cursor-pointer rounded-md border"
      onClick={() => setmainImage(img)}
    >
      <Image
        src={img}
        alt={product?.title || 'product'}
        fill
        className={`object-cover ${
          mainImage === img ? 'border-blue-500' : ''
        }`}
      />
    </div>
  ))}
</div>
      </div>

<div >
  

      {/* BRAND + TITLE */}
      <div className='flex items-center gap-4 mt-4'>
        <p className='text-blue-400 bg-blue-200 p-1 rounded-2xl'>
          DEFACTO
        </p>

        <p className='text-gray-500 '>
          {product?.title}
        </p>
      </div>
      
        <p className='text-gray-500 text-3xl font-bold'>
          {product?.slug}
        </p>

      {/* average raiting */}
 <div className='flex items-center gap-2 '>
  <div>
       {Array.from({ length: 5 }).map((_, i) => (
  <span key={i}>
    {i < Math.round(product?.ratingsAverage || 0) ? '⭐' : '☆'}
  </span>
))}
  </div>
<p>{product?.ratingsAverage}</p>
<p>({product?.reviews?.length} reviews)</p>
 </div>
      {/* PRICE */}
      <div className='border border-1 bg-blue-400'/>
      <h2 className='text-3xl font-bold text-blue-400 mt-4'>
       ${product?.price} 
      </h2>

      <p className='text-xs text-gray-400'>
        In Stock - Ready to ship
      </p>
      <div className='border border-1 bg-blue-400 '/>

      <p className='font-bold mt-4'>Product Description</p>

      <p className='text-gray-500'>
        {product?.description}
      </p>

      {/* BUTTONS */}
      <div className='mt-4 flex gap-2'>
        <AddSpecialProduct Id={product!._id}/>

        <Link href={'/whishlist'}>
          <Button className='bg-white  py-2 border border-blue-300 border-2 text-black hover:text-red-400 hover:border-red-400'>
            <FaRegHeart />
          </Button>
        </Link>
      </div>
</div>

    </div>
  </div>
  </>
}

export default Page