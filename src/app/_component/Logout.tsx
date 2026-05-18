'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FiLogOut } from "react-icons/fi"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push("/sign-in")
  }

  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-1 cursor-pointer"
    >
      Logout <FiLogOut />
    </div>
  )
}