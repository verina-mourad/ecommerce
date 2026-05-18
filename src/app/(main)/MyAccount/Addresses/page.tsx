'use client'
import AddAddress from '@src/app/_component/AddAddress'
import DataAddresses from '@src/app/_component/DataAddresses'
import { Button } from '@src/components/ui/button'
import { AddAdress } from '@src/Context/AddAddress'
import React, { useContext, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

const page = () => {
  const [refresh, setRefresh] = useState(false)
const data=useContext(AddAdress)
  return <>
  <div className='flex justify-between items-center'>
    <div className='flex items-center gap-5 shrink-0'>
        <FaMapLocationDot className='text-blue-400 size-6' />
        <div className='flex flex-col'>
            <h2 className='font-bold'>Shipping Addresses</h2>
            <p className='text-gray-400'>Manage where your orders are delivered.</p>
        </div>
    </div>
          <Button className='bg-blue-400 cursor-pointer text-white p-3' onClick={()=>data.setopen(true)}>+ Add New Address</Button>
  </div>
    
      <AddAddress />
      


  </>
}

export default page