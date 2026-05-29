'use server'
import { getUserToken } from "@src/getUserToken"

export async function AddWishlist(Id:string){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUPLIC_BASE_URL}/api/v1/wishlist`,{method:'POST',
            body:JSON.stringify({
                productId:Id
            }),
            headers:{
                 'Content-Type': 'application/json',
                 token: token,
            }
        })
        const data=await res.json()
        return data
    }catch(error){
        console.log(error);
        throw error
        
    }
}


export async function Getwishlist(){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUPLIC_BASE_URL}/api/v1/wishlist`,{method:'GET',
            headers:{
                 'Content-Type': 'application/json',
                 token: token,
            }
        })
        const data=await res.json()
        return data
    }catch(error){
        console.log(error);
        throw error
        
    }      
}


export async function RemoveWishlist(Id:string){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUPLIC_BASE_URL}/api/v1/wishlist/${Id}`,{method:'delete',
            headers:{
                 'Content-Type': 'application/json',
                 token: token,
            }
        })
        const data=await res.json()
        return data
    }catch(error){
        console.log(error);
        throw error
        
    }      
}


export async function ClearWishlist(){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUPLIC_BASE_URL}/api/v1/wishlist`,{method:'delete',
            headers:{
                 'Content-Type': 'application/json',
                 token: token,
            }
        })
        const data=await res.json()
        return data
    }catch(error){
        console.log(error);
        throw error
        
    }      
}