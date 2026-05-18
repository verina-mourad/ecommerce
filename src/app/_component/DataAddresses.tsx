import { getAddress } from '@src/api/Addresses';
import { product } from '@src/types/dataaddresses';
import React, { useEffect, useState } from 'react'
import { FaPhoneAlt, FaRegTrashAlt } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { PiBuildingApartmentFill } from "react-icons/pi";
import RemoveAdresses from './RemoveAdresses';

const DataAddresses = ({
  formaddress,
  refresh,
  setAddresses,
}: {
  formaddress: product[]
  refresh: boolean
  setAddresses: React.Dispatch<React.SetStateAction<product[]>>
}) => {  async function getData(){
  const data=await getAddress()
  console.log(data);
  setAddresses(data.data)
  
}
useEffect(() => {
  getData()
}, [refresh])
return <>
   <div className=' gap-1 flex flex-col  hover:border-blue-300'>
 {formaddress.map((address)=>(
 <div className='m-4 bg-gray-100 p-4 rounded-2xl ' key={address._id}>
    <div className='flex justify-between items-center'>
    <div className='flex items-center gap-2'>
  <div className='bg-gray-100'><IoLocationSharp className='text-blue-400'/></div>
   <p>{address.name}</p>
    </div>
   <RemoveAdresses ID={address._id} setAddresses={setAddresses}/>
   </div>
    <p className='text-gray-500'>{address.details}</p>
    <div className='flex items-center gap-4'>
      <p className='flex gap-1 items-center text-gray-500'><FaPhoneAlt/>{address.phone}</p>
      <p className='flex gap-1 items-center  text-gray-500'><PiBuildingApartmentFill/>{address.city}</p>
    </div>
 </div>
 ))}
 </div>
  </>
}

export default DataAddresses