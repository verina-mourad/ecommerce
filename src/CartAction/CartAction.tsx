'use server'
import { getUserToken } from '@src/getUserToken'
import React from 'react'
import { number } from 'zod'

export async function AddCart(Id:string){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{method:'POST',
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

export async function GetCart(){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{method:'GET',
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

export async function UpdateCart(Id:string,count:number){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${Id}`,{method:'put',
               body:JSON.stringify({
                    count: count
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

export async function RemoveCart(Id:string){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${Id}`,{method:'Delete',
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

export async function ClearCart(Id:string,count:number){
    const token:any =await getUserToken()
    if (!token) {
    throw new Error('token Error')
    }
    try{
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${Id}`,{method:'Delete',
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
