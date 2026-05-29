'use server'

import { getUserToken } from "@src/getUserToken";

export async function CheckOutSession(
  Id : string,
  shippingAddress: { details: string; phone: string; city: string }
) {
  const token: any = await getUserToken();
  if (!token) throw new Error("User token not found");

  // URL fallback لو env مش موجودة

  const res = await fetch(
    `${process.env.NEXT_PUPLIC_BASE_URL}/api/v1/orders/checkout-session/${Id}?url=http://localhost:3000`,
    {
      method: "POST",
      body: JSON.stringify({shippingAddress}),
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    }
  );

  const data = await res.json();
  return data;
}

export async function CashOrder(
  Id : string,
  shippingAddress: { details: string; phone: string; city: string }
) {
  const token: any = await getUserToken();
  if (!token) throw new Error("User token not found");

  const res = await fetch(
    `${process.env.NEXT_PUPLIC_BASE_URL}/api/v1/orders/${Id}`,
    {
      method: "POST",
      body: JSON.stringify({shippingAddress}),
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    }
  );

  const data = await res.json();
  return data;
}


export default async function GetOrder() {
    const token:any=await getUserToken()
    if (!token){
        throw new Error('User token not found')
    }
 const res= await fetch(`${process.env.NEXT_PUPLIC_BASE_URL}/api/v1/orders`, {
    headers: {
        token:token
    }
 })
 const data= await res.json()
 return data

}