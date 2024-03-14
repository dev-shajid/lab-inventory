import bcrypt from 'bcrypt'
import { signJwtToken } from "@/lib/jwt";
import { NextResponse } from 'next/server'
import db from '@/lib/db';

export async function POST(req) {
    try {
        const { name, email, password: pass, phone, } = await req.json()
        // console.log({ name, email, pass, phone, })
        if (!name || !email || !pass) {
            return new Response(JSON.stringify({ error: "Fill all the field!" }), { status: 400 })
        }

        const isExisting = await db.user.findFirst({ where: { email } })

        if (isExisting) {
            return new Response(JSON.stringify(
                {
                    error: "Email already registered"
                }),
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(pass, 10)

        const newUser = await db.user.create({ data: { name, email, password: hashedPassword, phone, } })

        console.log(newUser);
        const { password, ...user } = newUser

        console.log({ user })
        // const accessToken = signJwtToken(user, { expiresIn: '6d' })
        // return NextResponse.json({ ...user, accessToken }, { status: 200 })
        return new Response(JSON.stringify({ message: "Succesful! Wait until verification" }), { status: 200 })
    } catch (error) {
        console.log({ error: error.message });
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
}