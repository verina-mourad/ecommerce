'use client'
import { OrderContext, ordertype } from '@src/Context/Order';
import React, { useContext, useState } from 'react'
import { BsCashCoin } from 'react-icons/bs';
import { FaCcVisa } from 'react-icons/fa';
import { GoFileSubmodule } from 'react-icons/go';

const Payment = ({setMethod,method}:ordertype) => {
  return <>
       <div className='flex items-center gap-2 mt-4 p-3 bg-blue-400 rounded-t-2xl'>
        <GoFileSubmodule  className='text-white'/>
        <div className='flex flex-col gap-1'>
          <p className='text-white'>PAYMENT</p>
      </div>
        </div>
     <div className="flex flex-col gap-3">
  
        {/* CASH */}
        <div
          onClick={() => setMethod("cash")}
          className={`border-2 rounded-2xl m-4 cursor-pointer transition
          ${method === "cash" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        >
          <div className="flex items-center justify-between p-3">
  
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-3 rounded-2xl w-fit">
                <BsCashCoin />
              </div>
  
              <div className="flex flex-col">
                <p className="font-bold">CASH ON DELIVERY</p>
                <p className="text-sm text-gray-400">
                  PAY WHEN YOUR ORDER ARRIVES
                </p>
              </div>
            </div>
  
            {/* RADIO */}
            <input
              type="radio"
              checked={method === "cash"}
              onChange={() => setMethod("cash")}
              className="accent-blue-500 w-4 h-4"
            />
  
          </div>
        </div>
  
        {/* VISA */}
        <div
          onClick={() => setMethod("visa")}
          className={`border-2 rounded-2xl m-4 cursor-pointer transition
          ${method === "visa" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        >
          <div className="flex items-center justify-between p-3">
  
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-3 rounded-2xl w-fit">
                <FaCcVisa />
              </div>
  
              <div className="flex flex-col">
                <p className="font-bold">PAY ONLINE</p>
                <p className="text-sm text-gray-400">
                  Secure payment via Stripe
                </p>
              </div>
            </div>
  
            {/* RADIO */}
            <input
              type="radio"
              checked={method === "visa"}
              onChange={() => setMethod("visa")}
              className="accent-blue-500 w-4 h-4"
            />
  
          </div>
        </div>
  
      </div>
  
  </>
}

export default Payment