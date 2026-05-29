'use client'
import React, { useContext, useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { AddWishlist } from '../WishlistAction/WishlistAction'
import { FaHeart } from 'react-icons/fa'
import { Count } from '@src/Context/Count'
import { ImSpinner9 } from "react-icons/im";
import Link from 'next/link'


const WishlistAddAction = ({ Id }: { Id: string }) => {
  const [liked, setliked] = useState(false)
  const Data=useContext(Count)
  async function AddAllWishlist(Id: string) {

    try {
      const data = await AddWishlist(Id)
      console.log(data);
      

      if (data.status === 'success') {
        toast.success('Product Added Successfully',{position:'top-center'})
        setliked(true)
        {Data?.setcount((prev)=>prev+1)}
      } else {
        toast.error('Error adding to cart',{position:'top-center'})
      
      }
    } catch (error) {
      toast.error('Something went wrong')
    } 
  }

  return (
<div className="absolute top-3 right-3 flex flex-col gap-2 z-50 pointer-events-auto">
      {/* HEART */}
      <button
        onClick={() => (AddAllWishlist(Id))}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:scale-110 transition"
      >
        <FaHeart className={`text-gray-600 text-xl hover:text-red-500 transition cursor-pointer ${liked?'text-red-500':'text-gray-600'}`} />
      </button>

      {/* EYE */}
     <Link href={`/Shop/${Id}`}>
      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 cursor-pointer hover:scale-110 transition group">
        <IoEyeOutline className="text-gray-600 text-xl group-hover:text-blue-400 transition" />
      </button>
     </Link>


    </div>
  )
}

export default WishlistAddAction