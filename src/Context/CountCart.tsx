'use client'

import { GetCart } from "@src/CartAction/CartAction";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";

type counttpe = {
    countCart: number,
    setcountCart: React.Dispatch<React.SetStateAction<number>>,
    loading: boolean,
    setloading: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartCount = createContext<counttpe | null>(null)

export function CartCountProvider({ children }: { children: React.ReactNode }) {

    const [countCart, setcountCart] = useState<number>(0)
    const [loading, setloading] = useState<boolean>(false)

    const { status } = useSession()

    useEffect(() => {

        async function fetchcart() {

            if (status !== 'authenticated') {
                setcountCart(0)
                return
            }

            try {

                setloading(true)

                const data = await GetCart()

                setcountCart(data.numOfCartItems)

            } catch (error) {

                console.log(error);

            } finally {

                setloading(false)
            }
        }

        fetchcart()

    }, [status])

    return (
        <CartCount.Provider
            value={{ countCart, setcountCart, loading, setloading }}
        >
            {children}
        </CartCount.Provider>
    )
}