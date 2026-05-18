'use server'

import { getUserToken } from "@src/getUserToken"

export async function UpdatePasswordAction(value: {
  currentPassword: string
  password: string
  rePassword: string
}) {

  const token:any = await getUserToken()

  if (!token) {
    throw new Error('token Error')
  }

  try {

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      {
        method: 'PUT',

        body: JSON.stringify({
          currentPassword: value.currentPassword,
          password: value.password,
          rePassword: value.rePassword
        }),

        headers: {
          'Content-Type': 'application/json',
          token: token,
        }
      }
    )

    const data = await res.json()

    return data

  } catch (error) {
    throw error
  }
}