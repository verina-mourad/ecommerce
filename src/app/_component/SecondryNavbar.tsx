import Link from 'next/link'
import React from 'react'
import { FaGift, FaPhoneAlt, FaTractor } from 'react-icons/fa'
import { MdOutlinePerson } from 'react-icons/md'
import { SlEnvolopeLetter } from 'react-icons/sl'

const SecondryNavbar = () => {
  return <>
  <div className='bg-gray-200 hidden md:flex'>
         <div className=" container mx-auto px-4 flex flex-col md:flex-row justify-between items-center  px-4 py-2 text-sm gap-2 md:grid md:grid-cols-6">

        <div className="flex gap-4 col-span-2">
          <p className="flex items-center gap-1 col-span-1 ">
            <FaTractor className='text-blue-400 size-6' /> Free Shipping on orders 500 EGP+
          </p>
          <p className="flex items-center gap-1 col-span-1">
            <FaGift className='text-blue-400 size-6' /> New Arrivals Daily
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center col-span-4">
          <p className="flex items-center gap-1 col-span-1">
            <FaPhoneAlt /> +1(800) 123-4567
          </p>

          <p className="flex items-center gap-1 col-span-1">
            <SlEnvolopeLetter /> support@farmart.com
          </p>

          <Link href="/sign-in" className="flex items-center gap-1 col-span-1">
            <MdOutlinePerson className='size-5' /> Sign In
          </Link>

          <Link href="/sign-up" className="flex items-center gap-1 col-span-1">
            <MdOutlinePerson className='size-5' /> Sign Up
          </Link>
        </div>,
      </div>

     </div>
  </>
}

export default SecondryNavbar