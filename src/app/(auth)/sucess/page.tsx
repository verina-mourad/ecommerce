'use client'
import { Button } from '@src/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa'

function Page() {
  const router = useRouter()
  

  return (
    <div className='container mx-auto shadow-2xl max-w-[700px] h-[700px] flex items-center justify-center'>

     <div className='hidden lg:flex lg:bg-blue-950 lg:w-1/3 rounded-tl-2xl rounded-bl-2xl pt-14 '>
    <div className=' flex flex-col gap-5 px-8'>
      <div className='bg-blue-400/40 rounded-2xl p-1 px-2 text-xs w-fit text-white flex items-center gap-1'>
        <p className='rounded-full bg-green-600 w-2 h-2 px-1'></p>
        Security First
      </div>  
      <h2 className='text-4xl font-bold text-white'>Don't <span className='text-blue-400'>WORRY</span></h2>
    <p className='text-gray-400'>We'll help you get back <br />to your fresh groceries in <br /> no time.</p>
      <p className=" absolute  left-1/2 -translate-x-1/2 bottom-0 text-gray-400 text-center p-2">
       Password  <br /> Recovery
    </p>   
   </div>
    </div>

      <div className='bg-white rounded-2xl w-full lg:w-2/3 p-10'>
        <div className='flex flex-col items-center text-center gap-5'>

  {/* icon */}
  <div className='bg-green-100 p-5 rounded-full flex items-center justify-center'>
    <div className='bg-blue-400 p-5 rounded-full flex items-center justify-center'>
      <FaCheck className='text-white size-5' />
    </div>
  </div>

  {/* title */}
  <h2 className='text-4xl font-bold'>
    Success! 🎉
  </h2>

  {/* text */}
  <p className='text-gray-700'>
    Password Updated Successfully
  </p>

  <p className='text-gray-400 leading-relaxed'>
    Your account is now secure. Use your new password <br />
    to access your FarMart account.
  </p>

  {/* button */}
  <Link href='/sign-in'>
  <Button
    className="cursor-pointer bg-blue-950 text-white p-6 flex items-center gap-2"
  >
    Back to Sign In <FaArrowRightLong />
  </Button>
  
  </Link>

</div>
      </div>

    </div>
  )
}

export default Page