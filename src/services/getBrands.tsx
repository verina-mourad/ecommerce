import React from 'react'

const getBrands =async () => {
   try{
     const res=await fetch('https://ecommerce.routemisr.com/api/v1/brands')
    if(!res.ok){
        throw new Error('Failed to fetch')
    }
    const data=await res.json()
  return data.data
    }
   catch(error){
    console.log(error);
    return []
   }

}
export default getBrands