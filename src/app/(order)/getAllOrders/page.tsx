'use client'

import OrderLinks from '@src/app/_component/OrderLinks'
import { Button } from '@src/components/ui/button'
import { CartCount } from '@src/Context/CountCart'
import GetOrder from '@src/Getorder.tsx/Getorder'
import { product } from '@src/types/AllOrder'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillFile } from 'react-icons/ai'
import { CiBookmarkCheck } from 'react-icons/ci'
import { FaArrowLeft } from 'react-icons/fa'
import { SlArrowDown } from 'react-icons/sl'

const Page = () => {
  const [AllOrders, setAllOrders] = useState<product[]>([])
  const [Details, setDetails] = useState<string | null>(null)
  const count = useContext(CartCount)

  async function GetAllOrders() {
    try {
      const data = await GetOrder()
      setAllOrders(data?.data || [])
    } catch (err) {
      console.log(err)
      setAllOrders([])
    }
  }

  useEffect(() => {
    GetAllOrders()
  }, [])

  return (
    <>
      <OrderLinks />

      {/* HEADER */}
      <div className='flex items-center justify-between m-4'>
        <div className='flex items-center gap-3'>
          <div className='bg-blue-400 p-3 rounded-2xl'>
            <AiFillFile className='text-white' />
          </div>

          <div>
            <h2 className='text-2xl font-bold'>My Orders</h2>
            <p className='text-gray-400'>
              Track and manage your{' '}
              <span className='text-blue-400'>
                {count?.countCart || 0} items
              </span>
            </p>
          </div>
        </div>

        <Link href='/' className='text-blue-400 flex items-center gap-2'>
          <FaArrowLeft />
          Continue Shopping
        </Link>
      </div>

      {/* ORDERS */}
      <div className='space-y-4'>
        {AllOrders?.length === 0 && (
          <p className='text-center text-gray-400'>No orders yet</p>
        )}

        {AllOrders?.map((order) => {
          const cartItems = order?.cartItems || []

          const totalItems = cartItems.reduce(
            (sum, item) => sum + (item?.count || 0),
            0
          )

          const totalPrice = cartItems.reduce(
            (sum, item) => sum + (item?.price || 0) * (item?.count || 0),
            0
          )

          const isOpen = Details === order?._id

          const firstItem = cartItems?.[0]

          return (
            <div key={order?._id} className='border rounded-2xl p-4'>

              {/* ORDER CARD */}
              <div className='flex justify-between items-center'>

                <div className='flex items-center gap-4'>

                  <div className='relative w-fit'>
                    <Image
                      width={80}
                      height={80}
                      src={firstItem?.product?.imageCover || '/placeholder.png'}
                      alt={firstItem?.product?.title || 'product'}
                    />

                    <span className='absolute top-0 right-0 bg-blue-400 text-white text-xs px-2 rounded-full'>
                      +{cartItems?.length || 0}
                    </span>
                  </div>

                  <div className='flex flex-col'>
                    <p className='bg-amber-100 text-yellow-900 w-fit px-2 py-1 rounded-2xl text-xs'>
                      PROCESSING
                    </p>

                    <p className='text-gray-400 text-xs'>
                      {order?.createdAt
                        ? new Date(order.createdAt).toLocaleString('en-GB')
                        : 'No date'}
                    </p>

                    <p className='text-gray-400 text-xs'>
                      {totalItems} items
                    </p>

                    <p className='text-2xl font-bold'>
                      {totalPrice}
                      <span className='text-blue-400 text-xs'> EGP</span>
                    </p>
                  </div>

                </div>

                {/* BUTTON */}
                <Button
                  onClick={() =>
                    setDetails(prev =>
                      prev === order?._id ? null : order?._id || null
                    )
                  }
                  className={`bg-gray-200 text-black flex items-center gap-1 ${isOpen &&'bg-blue-400 transition-all'}`}
                >
                  {isOpen?'Hide':'Details'}
                  <SlArrowDown
                    className={`transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Button>

              </div>

              {/* DETAILS */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? 'max-h-[1000px] mt-4' : 'max-h-0'
                }`}
              >
                <div className='bg-white shadow-xl rounded-2xl p-4'>

                  <div className='flex items-center gap-2 mb-3'>
                    <CiBookmarkCheck className='text-green-500 bg-green-100 rounded-full' />
                    <p>Order Items</p>
                  </div>

                  {cartItems
                    .filter(item => item?.product)
                    .map((item) => (
                      <div
                        key={item?._id}
                        className='flex items-center justify-between mb-3'
                      >

                        <div className='flex items-center gap-3'>

                          <Image
                            width={50}
                            height={50}
                            src={item?.product?.imageCover || '/placeholder.png'}
                            alt={item?.product?.title || 'product'}
                          />

                          <div>
                            <p>
                              {item?.product?.title
                                ?.split(' ')
                                ?.slice(0, 2)
                                ?.join(' ') || 'No title'}
                            </p>

                            <p className='text-gray-400 text-sm'>
                              {item?.count || 0} × {item?.price || 0} EGP
                            </p>
                          </div>

                        </div>

                        <p className='font-semibold'>
                          {(item?.count || 0) * (item?.price || 0)} EGP
                        </p>

                      </div>
                    ))}

                </div>
              </div>

            </div>
          )
        })}
      </div>
    </>
  )
}

export default Page










