'use client'

import { Getwishlist } from "@src/app/WishlistAction/WishlistAction";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

type counttype={
   count:number,
   setcount:React.Dispatch<React.SetStateAction<number>>,
   loading:boolean,
   setloading:React.Dispatch<React.SetStateAction<boolean>>

}

export const Count=createContext<counttype|null>(null)

export function CountProvider({children}:{children:React.ReactNode}){
    const [count, setcount] = useState<number>(0)
    const [loading, setloading] = useState<boolean>(false)
    const {status}=useSession()
    useEffect(()=>{
        async function fetchWishlist(){
              if(status !== 'authenticated'){
                    return setcount(0)
                }
            try{
                setloading(true)
                const data=await Getwishlist()
               setcount(data.data.length)
            }catch(error){
                console.log(error);
                
            }finally{
                setloading(false)
            }
        }  fetchWishlist()
    },[status])
    return(
        <Count.Provider value={{count,setcount,loading,setloading}}>
            {children}
        </Count.Provider>
    )
}