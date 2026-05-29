import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"

export const NextOptions: NextAuthOptions = {
    pages: {
        signIn: "/signin",
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "your@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" },
                })
                const data = await res.json()
                if (data.message === 'success') {
                    return {
                        id: data.id,
                        user: data.user,
                        token: data.token
                    }
                } else {
                    throw new Error(data.message)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.token = user.token
                token.user = user.user
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        }
    }
}

const handler = NextAuth(NextOptions)

export { handler as GET, handler as POST }