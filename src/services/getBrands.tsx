import React from 'react'

const getBrands =async () => {
   try{
     const res=await fetch('${process.env.NEXT_PUPLIC_BASE_URL}/api/v1/brands')
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