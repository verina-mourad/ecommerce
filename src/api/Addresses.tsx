'use server'

import { getUserToken } from '@src/getUserToken'
import { error } from 'console'
type AddressInput = {
  name: string
  details: string
  phone: string
  city: string
}

export  async function addAddress(value: AddressInput) {
  const token:any = await getUserToken()

  if (!token) {
    throw new Error('token Error')
  }

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: value.name,
          details: value.details,
          phone: value.phone,
          city: value.city,
        }),
        headers: {
          'Content-Type': 'application/json',
          token:token,
        },
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      throw new Error('Failed to add address')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Add address error:', error)
    throw error
  }
}


export async function getAddress(){
   const token:any=await getUserToken()
   if(!token){
    throw new Error('token Error')
   }
   try{
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`,{
      headers:{
          'Content-Type': 'application/json',
          token:token,
      },
        cache: 'no-store',
    }) 
    if(!res.ok){
            throw new Error('Failed to get address')
    }
    const data=await res.json()
    return data
   }catch(error){
      throw error

   }
}


export async function DeleteAddress(ID:string) {
   const token:any=await getUserToken()
   if(!token){
    throw new Error('token Error')
   }
   try{
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${ID}`,{method:'delete',
      headers:{
          'Content-Type': 'application/json',
          token:token,
      },
    })
     if(!res.ok){
            throw new Error('Failed to get address')
    }
    const data=await res.json()
    return data
   }catch(error){
      throw error

   }

  
}