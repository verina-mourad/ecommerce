'use client'
import { Button } from '@src/components/ui/button'
import { Wishproduct } from '@src/types/wishlisttypes'
import React, { useContext, useEffect, useState } from 'react'
import { FaHeart, FaRegTrashAlt } from 'react-icons/fa'
import { BsCart3 } from 'react-icons/bs'
import Image from 'next/image'
import WhishlistEmpty from '@src/app/_component/WhishlistEmpty'
import { IoEyeOutline } from 'react-icons/io5'
import { ClearWishlist, Getwishlist, RemoveWishlist } from '@src/app/WishlistAction/WishlistAction'
import { Count } from '@src/Context/Count'
import { ImSpinner9 } from 'react-icons/im'

function Page() {  
  const [loading, setloading] = useState<boolean>(false)
  const [whishlist, setwhishlist] = useState<Wishproduct[]>([])
  const Data=useContext(Count)
  
  async function GetAllWishlist(){
    try{
      setloading(true)
      const data = await Getwishlist()
      setwhishlist(data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  async function RemoveProductWishlist(Id:string){
    try{
      setloading(true)
       await RemoveWishlist(Id)
      setwhishlist((prev)=>(prev.filter((p)=>p._id !== Id )))
     Data?.setcount((prev)=>prev-1)
      
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  async function ClearAllWishlist(){
    try{
      setloading(true)
       await ClearWishlist()
      setwhishlist([])
      Data?.setcount(0)
      
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  useEffect(()=>{
    GetAllWishlist()
  },[])

  return <>
    <div className='flex justify-between items-center m-4'>
      <div className='flex items-center gap-2'>
        <div className='bg-blue-200 w-fit p-2 rounded-xl'>
          <FaHeart className='text-blue-400 animate-pulse size-8'/>
        </div>
        <div>
          <h2 className='font-bold text-3xl'>
            My <span className='text-blue-400'>Wishlist</span>
          </h2>
          <p className='text-gray-300'>
            you have <span className='text-black'>{whishlist.length} items saved</span>
          </p>
        </div>
      </div>
      <div onClick={ClearAllWishlist} className="group">
        <p className='text-red-400 hover:bg-red-100 rounded-2xl p-2 flex items-center gap-1 cursor-pointer'>
          <FaRegTrashAlt className='group-hover:rotate-12 transition-all duration-300'/> clear All Favorites
        </p>
      </div>
    </div>

    <div className='border border-blue-200 m-4'/>

    {whishlist.length === 0 ? (
      <WhishlistEmpty/>
    ) : (
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4'>
        {whishlist.map((product) => (
          <div
            key={product._id}
            className="bg-white relative group rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition hover:border hover:border-blue-400"
          >
           <div className="relative w-full h-60 overflow-hidden group">

  <Image
    src={product.imageCover}
    alt={product.title}
    fill
    className="object-cover transition-transform duration-300 group-hover:scale-110"
  />

  {/* icons */}
  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

    {/* love */}
    <div className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-red-100" onClick={()=>(RemoveProductWishlist(product._id))}>
      <FaHeart className="text-red-500" />
    </div>

    {/* eye */}
    <div className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-blue-100">
      <IoEyeOutline className="text-blue-500" />
    </div>

  </div>

</div>

            <div className="p-4 flex flex-col gap-2">

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

              <p className="text-sm text-blue-400">
                {product.category?.name}
              </p>

              <p className="font-semibold line-clamp-2">
                {product.title}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="font-bold text-lg">
                  ${product.price}
                </p>

                <Button className="bg-blue-400 hover:bg-blue-500 rounded-full p-2">
                  <BsCart3 className="text-white" />
                </Button>
              </div>

            </div>
          </div>
        ))}
      </div>
    )}
  </>
}

export default Page