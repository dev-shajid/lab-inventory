import NextAuth from "next-auth";
import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from 'bcrypt'
import db from "@/lib/db";
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            // credentials: {
            //     email: { label: "Email", type: "text", placeholder: 'Enter your Email' },
            //     password: { label: "Password", type: "password", placeholder: 'Enter Password' },
            // },
            async authorize(credentials, req) {
                const { email, password } = credentials
                try {
                    if (!email || !password) throw new Error({ error: "Password error" })
                    await db.connect()

                    const user = await User.findOne({ email })
                    // console.log(user);
                    if (!user) {
                        throw new Error("User does not exist")
                    }

                    const comparePass = await bcrypt.compare(password, user.password)

                    if (!comparePass) {
                        throw new Error("Invalid credentials!")
                    } else {
                        const { password, ...currentUser } = user._doc

                        const accessToken = signJwtToken(currentUser, { expiresIn: '6d' })

                        return {
                            ...currentUser,
                            accessToken
                        }
                    }
                } catch (error) {
                    console.log({ shajid:"Shajid's Error", Error });
                    throw new Error(error)
                }
            }
        }),
    ],
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/signin',
        error: '/signin/error',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                console.log({ user, account, profile, email, credentials })
                if (credentials) return user
                else if (user.email) {
                    return user
                }
                return false
            } catch (err) {
                console.log({ Error: err });
                return err
            }
        },
        async jwt({ token, user }) {
            // console.log(token, user);
            if (user) {
                token.accessToken = user.accessToken
                token._id = user._id
                token.name = user.name
            }

            return token
        },
        async session({ session, token }) {
            // console.log({ session, token });
            if (token) {
                session.user._id = token._id
                session.user.name = token.name
                session.user.accessToken = token.accessToken
            }
            return session
        }
    },
    // debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }