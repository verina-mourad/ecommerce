import React from 'react'
import { BiLogoFacebook } from 'react-icons/bi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaCcAmazonPay, FaCcVisa, FaInstagram, FaPaypal, FaShoppingCart, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { PiContactlessPaymentFill } from 'react-icons/pi'

const Footer = () => {
  return <>
<div className='container mx-auto px-3'>
 <div className='grid grid-cols-2 lg:grid-cols-4'>
    <div className='col-span-1 md:col-span-1 mt-6 md:md-2'>
         <div className='flex items-center gap-1 text-2xl'>
    <div className='bg-blue-400 text-white p-1 rounded-xl'>
        <FaShoppingCart />
    </div>
    <p className='font-bold'>Far <span className='text-blue-400'>Mart</span></p>
  </div>
    <p>Your one-stop shop for fresh, organic, and premium products delivered straight to your doorstep.
    </p>
    <div className='flex items-center gap-2'>
        <BiLogoFacebook className='icon-style' />
        <FaInstagram  className='icon-style' />
        <FaYoutube className='icon-style' />
        <FaTwitter className='icon-style' />
    </div>
 </div>
 <div className='flex flex-col col-span-1 md:col-span-1 mt-6 md:md-2'>
    <p>Quick Links</p>
    <div className='border border-2 border-blue-400 w-12'/>
    <p className='Links'>About Us</p>
    <p className='Links'>Shop Collection</p>
    <p className='Links'>Best Sellers</p>
    <p className='Links'>New Arrivals</p>
 </div>
 <div className='flex flex-col mt-6 md:md-2 col-span-1 md:col-span-1'>
    <p>Support</p>
    <div className='border border-2 border-blue-400 w-12'/>
    <p className='Links'>Help Center</p>
    <p className='Links'>Track Your Order</p>
    <p className='Links'>Shipping Policy</p>
    <p className='Links'>Returns & Refunds</p>
 </div>
 <div className='flex flex-col mt-6 md:md-2 col-span-1 md:col-span-1'>
    <p>Contact Us</p>
    <div className='border border-2 border-blue-400 w-12'/>
    <p className='Links-contact'><FaLocationDot className='text-blue-400' /> 123 Market St, Cairo, Egypt</p>
    <p className='Links-contact'><BsFillTelephoneFill/> +20 123 456 789</p>
    <p className='Links-contact'><MdEmail/> support@farmart.com</p>
 </div>
 </div>
 <div className='flex items-center justify-between mt-2'>
    <p>© 2026 FarMart. All rights reserved.</p>
    <div className='text-gray-300 flex items-center gap-1'>
        <FaCcVisa className='size-6'/>
        <FaCcAmazonPay className='size-6' />
        <FaPaypal className='size-6' />
        <PiContactlessPaymentFill className='size-6' />

    </div>
 </div>
</div>
  </>
}

export default Footer