'use client';
import React, { useContext, useState } from 'react'
import { AddWishlist } from '../WishlistAction/WishlistAction'
import { CiHeart } from 'react-icons/ci'
import { toast } from 'sonner'
import { Count } from '@src/Context/Count'

const AddWish = ({ Id }: { Id: string }) => {

  const [added, setadded] = useState(false)

  const whishlistcount = useContext(Count)

  async function AddwishCart(Id: string) {

    try {

      const data = await AddWishlist(Id)
          if (data?.message === "NOT_AUTHENTICATED") {
      toast.error("You should login first", {
        position: "top-center",
        });
        return;
        }
      if (data.status === 'success') {

        toast('successfully add product to wishlist', {
          position: 'top-center'
        })

        whishlistcount?.setcount((prev) => prev + 1)

        setadded(true)

      } else {

        toast('problem when adding product to wishlist', {
          position: 'top-center'
        })

        setadded(false)
      }

    } catch (error) {

      console.log(error)

      toast('something went wrong')

      setadded(false)
    }
  }

  return (
    <button
      onClick={() => AddwishCart(Id)}
      className="bg-white p-2 rounded-full shadow cursor-pointer"
    >
      <CiHeart className={added ? 'text-red-500' : ''} />
    </button>
  )
}

export default AddWish