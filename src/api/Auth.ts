
// VERIFY CODE
export async function verifyResetCodeAPI(data: { resetCode: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })

  return res.json()
}

// RESEND CODE
export async function resendResetCodeAPI(email: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/forgotPasswords`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" },
  })

  return res.json()
}

// RESEND CODE
// export async function resetPasswordAPI(data: {
//   email: string
//   newPassword: string
// }) {
//   const res = await fetch(`${BASE_URL}/resetPassword`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })

//   return res.json()
// }