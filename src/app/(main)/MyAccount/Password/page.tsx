'use client'    
import UpdatePassword from '@src/app/_component/UpdatePassword'
import React from 'react'
import { MdSecurity } from 'react-icons/md'
    
const Password = () => {


  return <>
  <div className='flex items-center gap-4'>
    <MdSecurity className='text-blue-400 size-8'/>
    <div className='flex flex-col'>
        <p className='font-bold'>Security Settings</p>
        <p className='text-gray-400'>Update your password to keep your account safe.</p>
    </div>
  </div>
<UpdatePassword/>
       </>
}

export default Password