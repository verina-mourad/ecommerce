import NextAuth, { User } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    user: {
      name: string,
      email: string,
      role: string
    }
    token:string
  }
  
  interface Session{
    user:User['user']
    accessToken:string
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    user:User['user']
    idToken?: string
    accessToken:string
  }
}