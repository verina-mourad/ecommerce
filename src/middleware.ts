import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

  // `withAuth` augments your `Request` with the user's token.
 export async function middleware(request:NextRequest) {
    const token=await getToken({req:request})
    if(token){
        return NextResponse.next()
    }
    else{
        return NextResponse.redirect(new URL('/',request.url))
    }
  }
 
  

export const config = { matcher: ["/cart",'/whishlist'] }