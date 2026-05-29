'use client'
import { Button } from '@src/components/ui/button'
import { LogoutContext } from '@src/Context/LogoutContext'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import { toast } from 'sonner'

const page = () => {
      const router = useRouter() 
      // const [open, setopen] = useState(false)
      const data=useContext(LogoutContext)
      const [success, setSuccess] = useState(false)
    
 const handleLogout = async () => {
  data.setopen(false)

  await signOut({ redirect: false })

  setSuccess(true)

  setTimeout(() => {
    router.push('/')
  }, 2000)
}
  return <>
  {data.open && (
  <>
    <div
      className='fixed inset-0 bg-black/40 z-40'
      onClick={() => data.setopen(false)}
    />
    <div className='fixed inset-0 flex items-center justify-center z-50'>
    <div className='bg-white rounded-xl p-8'>      
    <div className='flex flex-col items-center gap-3'>
    <BiErrorCircle className='size-9'/>
          <p className='font-bold text-blue-400'>Are you sure?</p>

          <p className='text-blue-400 '>
            you will be logged out!
          </p>

          <div className='flex items-center gap-2'>
            <Button
              onClick={handleLogout}
              className='bg-blue-400 text-white cursor-pointer'
            >
              Yes, log out
            </Button>

            <Button
              onClick={() => data.setopen(false)}
              className='text-white bg-red-500 cursor-pointer'
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  </>
)}
{success && (
  <>
    <div className='fixed inset-0 bg-black/40 z-50' />

    <div className='fixed inset-0 flex items-center justify-center z-[9999]'>

      <div className='bg-white p-8 rounded-2xl w-[400px] flex flex-col items-center gap-3'>

        <p className='text-2xl'>✅</p>

        <h2 className='text-xl font-bold text-green-600'>
          Logged out successfully
        </h2>

        <p className='text-gray-500 text-center'>
          See you again soon 👋
        </p>

      </div>

    </div>
  </>
)}
  </>
}

export default page