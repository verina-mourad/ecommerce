'use client'

import CartEmpty from '@src/app/_component/CartEmpty'
import { Loading } from '@src/app/_component/Loading'
import { GetCart, RemoveCart, UpdateCart } from '@src/CartAction/CartAction'
import { Button } from '@src/components/ui/button'
import { Input } from '@src/components/ui/input'
import { CartCount } from '@src/Context/CountCart'
import { Cart } from '@src/types/cart'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import {
  FaLongArrowAltRight,
  FaRegTrashAlt,
  FaSpinner,
  FaTrashAlt,
} from 'react-icons/fa'
import { IoIosRemoveCircle, IoMdCart } from 'react-icons/io'
import { IoAddCircle } from 'react-icons/io5'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { toast } from 'sonner'

const Page = () => {
  const [loading, setLoading] = useState(false)
  const [carts, setCarts] = useState<Cart | null>(null)

  const CountCart = useContext(CartCount)

  async function DeleteProduct(id: string) {
    const data = await RemoveCart(id)

    setCarts((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        products: prev.products.filter((item) => item._id !== id),
      }
    })

    if (data.status === 'success') {
      toast.success('Product deleted successfully', {
        position: 'top-center',
      })

      CountCart?.setcountCart(data.numOfCartItems)
    } else {
      toast.error('Error deleting product')
    }
  }

  async function UpdateProductCount(id: string, count: number) {
    setLoading(true)

    const data = await UpdateCart(id, count)

    if (data.status === 'success') {
      setCarts(data.data)

      const totalCount = data.data.products.reduce(
        (acc: number, item: any) => acc + item.count,
        0
      )

      CountCart?.setcountCart(totalCount)
    } else {
      toast.error('Error updating product')
    }

    setLoading(false)
  }

  async function GetAllProductCart() {
    try {
      setLoading(true)

      const data = await GetCart()

      setCarts(data.data)
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong', {
        position: 'top-center',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetAllProductCart()
  }, [])

  const subtotal = carts?.products.reduce(
    (total, item) => total + item.price * item.count,
    0
  )

  const shipping = subtotal && subtotal > 1500 ? 0 : 100
  const tax = subtotal ? subtotal * 0.14 : 0
  const total = subtotal ? subtotal + shipping + tax : 0

  return (
    <>
      {loading && (
        <div className='absolute inset-0 bg-black/40 z-50 flex items-center justify-center'>
          <Loading />
        </div>
      )}

      {!carts || carts.products.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className='bg-blue-50/70 m-4 p-4 rounded-2xl'>

          {/* Header */}
          <header className='mb-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-blue-400 p-3 rounded-xl'>
                <IoMdCart className='text-white text-xl' />
              </div>

              <div>
                <h2 className='font-bold text-lg'>
                  SHOPPING <span className='text-blue-400'>CART</span>
                </h2>

                <p className='text-sm text-gray-600'>
                  You have{' '}
                  <span className='text-blue-400 font-bold'>
                    {CountCart?.countCart} items
                  </span>{' '}
                  in your cart
                </p>
              </div>
            </div>
          </header>

          {/* Products */}
          <div className='flex flex-col gap-4'>

            {carts.products.map((product) => (
              <div
                key={product._id}
                className='bg-white rounded-2xl p-4 border border-blue-100 hover:shadow-xl transition'
              >
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                  {/* Left */}
                  <div className='flex items-center gap-4'>

                    <Image
                      src={product.product.imageCover}
                      alt={product.product.title}
                      width={100}
                      height={100}
                      className='rounded-xl'
                    />

                    <div className='space-y-2'>

                      <h3 className='font-semibold'>
                        {product.product.title
                          .split(' ')
                          .slice(0, 2)
                          .join(' ')}
                      </h3>

                      <p className='text-gray-500 text-sm'>
                        {product.product.category.name}
                      </p>

                      <p>
                        <span className='text-2xl text-blue-400 font-bold'>
                          {product.price}
                        </span>{' '}
                        EGP / unit
                      </p>

                      {/* Count Buttons */}
                      <div className='flex items-center gap-2'>

                        <Button
                          disabled={loading}
                          className='size-8 bg-blue-400 cursor-pointer'
                          onClick={() =>
                            UpdateProductCount(
                              product.product._id,
                              product.count - 1
                            )
                          }
                        >
                          {product.count === 1 ? (
                            <FaTrashAlt />
                          ) : (
                            <IoIosRemoveCircle />
                          )}
                        </Button>

                        <span className='font-bold'>
                          {loading ? (
                            <FaSpinner className='animate-spin' />
                          ) : (
                            product.count
                          )}
                        </span>

                        <Button
                          disabled={loading}
                          className='size-8 bg-blue-400 cursor-pointer'
                          onClick={() =>
                            UpdateProductCount(
                              product.product._id,
                              product.count + 1
                            )
                          }
                        >
                          <IoAddCircle />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className='flex items-center justify-between md:flex-col gap-3'>

                    <p className='font-bold text-lg'>
                      {product.price * product.count}{' '}
                      <span className='text-sm'>EGP</span>
                    </p>

                    <Button
                      disabled={loading}
                      onClick={() => DeleteProduct(product._id)}
                      className='bg-red-100 hover:bg-red-200 rounded-xl'
                    >
                      <FaRegTrashAlt className='text-red-400' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='bg-white mt-6 rounded-2xl p-5 border border-blue-100'>

            <h2 className='text-xl font-bold mb-4'>
              ORDER <span className='text-blue-400'>SUMMARY</span>
            </h2>

            <div className='space-y-3'>

              <div className='flex items-center justify-between'>
                <p className='text-gray-500'>SUBTOTAL</p>
                <p className='font-bold'>{subtotal} EGP</p>
              </div>

              <div className='flex items-center justify-between'>
                <p className='text-gray-500'>SHIPPING</p>
                <p className='font-bold'>{shipping} EGP</p>
              </div>

              <div className='flex items-center justify-between'>
                <p className='text-gray-500'>ESTIMATED TAX</p>
                <p className='font-bold'>{tax} EGP</p>
              </div>

              <div className='border border-blue-100' />

              <div>
                <p className='text-sm text-gray-500'>TOTAL AMOUNT</p>

                <h3 className='text-3xl text-blue-400 font-bold'>
                  {total} <span className='text-black text-sm'>EGP</span>
                </h3>
              </div>

              {/* Promo */}
              <div className='space-y-2 pt-3'>
                <p className='text-xs'>HAVE A PROMO CODE?</p>

                <div className='flex gap-2'>
                  <Input placeholder='Enter promo code' />

                  <Button className='bg-black hover:bg-gray-800 text-white'>
                    Apply
                  </Button>
                </div>
              </div>

              {/* Checkout */}
              {carts._id && (
                <Link href={`/CheckOutSession/${carts._id}`}>
                  <Button className='w-full mt-4 bg-blue-400 hover:bg-blue-500 text-white p-6 cursor-pointer'>
                    PROCEED TO CHECKOUT
                    <FaLongArrowAltRight />
                  </Button>
                </Link>
              )}

              {/* Back */}
              <Link
                href='/'
                className='flex items-center justify-center gap-1 text-sm hover:text-blue-400 mt-4'
              >
                <MdKeyboardArrowLeft />
                BACK TO SHOPPING
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page