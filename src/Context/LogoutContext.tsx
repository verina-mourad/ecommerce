'use client'
import React from 'react'

import { createContext, useContext, useState } from 'react'

export const LogoutContext = createContext<any>(null)

export function LogoutContextProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [open, setopen] = useState(false)

  return (
    <LogoutContext.Provider value={{ loading, setLoading,setopen ,open}}>
      {children}
    </LogoutContext.Provider>
  )
}

