'use client'

import { createContext, useContext, useState } from 'react'

export const AddAdress = createContext<any>(null)

export function AddAdressProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [open, setopen] = useState(false)

  return (
    <AddAdress.Provider value={{ loading, setLoading,setopen ,open}}>
      {children}
    </AddAdress.Provider>
  )
}

export function useLoading() {
  return useContext(AddAdress)
}