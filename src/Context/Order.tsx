'use client'

import { Getwishlist } from "@src/app/WishlistAction/WishlistAction";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

export type ordertype={
   method:string,
   setMethod:React.Dispatch<React.SetStateAction<string>>,

}

export const OrderContext=createContext<ordertype|null>(null)

export function OrderContextProvider({children}:{children:React.ReactNode}){
      const [method, setMethod] = useState("")
  
    return(
        <OrderContext.Provider value={{method,setMethod}}>
            {children}
        </OrderContext.Provider>
    )
}