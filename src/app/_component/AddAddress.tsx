'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { addAddress } from '@src/api/Addresses'
import { Button } from '@src/components/ui/button'
import { Field, FieldLabel } from '@src/components/ui/field'
import { Input } from '@src/components/ui/input'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import * as z from 'zod'
import DataAddresses from './DataAddresses'
import { product } from '@src/types/dataaddresses'
import Loading from '../loading'
import { AddAdress } from '@src/Context/AddAddress'
const AddAddress = () => {
const [addresses, setAddresses] = useState<product[]>([])
const [refresh, setRefresh] = useState(false) 
const [loading, setloading] = useState(false) 
// const [open, setopen] = useState(false)
 const data=useContext(AddAdress)
  const SchemaAddress=z.object({
       name: z.string().min(2, "Name is required"),
        details: z.string().min(5, "details must be at least 10 characters"),
        phone: z.string().min(11, "Egyptian phone only"),
         city: z.string().min(2, "City is required"),
 
    })

    const {register,formState:{errors},handleSubmit}=useForm({
        defaultValues:{
                "name": "",
             "details": "",
             "phone": "",
            "city": ""

        },          
        resolver:zodResolver(SchemaAddress),
         mode:'onChange'
    }
    )
  type AddressType=z.infer<typeof SchemaAddress>
 async function HandleAddresses(value:AddressType){
  setloading(true)
  const data=await addAddress(value)
  console.log(data);
  const formaddress:product[]= data.data
  setAddresses(formaddress) 
  setloading(false)
 }

    
  return <>
   <div className='relative'>

   {loading && (
    <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
      <Loading />
    </div>
  )}   
   </div>
       <DataAddresses setAddresses={setAddresses} formaddress={addresses} refresh={refresh}/>

    {data.open && <>
    
      <div onClick={()=>{data.setopen(false)}} className=' bg-black/40 fixed inset-0 z-40 '/>
      <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className=' bg-white w-[90%] md:w-1/2 lg:w-1/3 flex flex-col gap-3 rounded-2xl'>
       <div className='p-5'>
           <div className='flex items-center justify-between'>
              <h3 className='font-bold'>Add New Address</h3>
              <IoClose onClick={()=>{data.setopen(false)}}/>
          </div>
          <form onSubmit={handleSubmit(HandleAddresses)}>
              <Field>
        <FieldLabel htmlFor="input-field-username" className="text-gray-400">ADDRESS NAME</FieldLabel>
        <Input {...register('name')}
          id="input-field-username"
          type="text" className="font-bold"
          placeholder="e.g.Home,office"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <FieldLabel  className="text-gray-400 mt-2" htmlFor="input-field-username">FULL ADDRESS DETAILS</FieldLabel>
        <Input {...register('details')}
          id="input-field-username"
          type="text" className="font-bold"
          placeholder="Streeet,Building,Apartment" 
        />
         {errors.details && <p className="text-red-500">{errors.details.message}</p>}
         <div className="grid grid-cols-2 gap-4 mt-2">
                
                {/* Phone */}
                <div className="flex flex-col">
                    <FieldLabel className="text-gray-400">
                    PHONE NUMBER
                    </FieldLabel>
                    <Input {...register('phone')} placeholder="01xxxxxxxxx" className='h-10'/>
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                </div>

                {/* City */}
                <div className="flex flex-col">
                    <FieldLabel className="text-gray-400">
                    CITY
                    </FieldLabel>
                    <Input {...register('city')} placeholder="Cairo" className='h-10' />
                   {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                </div>

                </div>
        <div className='grid grid-cols-3 items-center gap-1'>
        <Button type='button' onClick={()=>{data.setopen(false)}} className='col-span-1 cursor-pointer bg-gray-300 text-gray-500'>Cancel</Button>
      <Button
        type='submit'
        className='col-span-2 cursor-pointer bg-blue-400 text-white'
      >
        Add Address
      </Button>        
      </div>
      </Field>
          </form>
       </div>
      </div>
      </div>
    </>
    }
  
  </>
}

export default AddAddress