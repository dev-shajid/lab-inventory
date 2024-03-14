import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtVerify, SignJWT } from "jose";
import db from "@/lib/db";

export async function POST(req) {
    try {
        const { email, password: pass } = await req.json()
        // console.log({email,pass})

        // await db.connect()
        // const curr = await User.findOne({email})
        const curr = await db.user.findFirst({where:{email}})
        if (!curr) throw new Error("User does not exist")

        const { password, ...user } = curr
        // console.log({password,user})



        //check if pass is correct
        const validpass = await bcrypt.compare(pass, password)
        if (!validpass) throw new Error("Invalid pass!")
        if (!user.isVerified) throw new Error("User is not verified yet!")

        //create token data
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        //create token
        const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: '6d' });
        // let token=await sign(tokenData, process.env.SECRET)

        const response = NextResponse.json({
            message: "Login successful",
            user,
            success: true,
        })
        response.cookies.set("token", token, {
            // httpOnly: true,
        })
        return response;
    } catch (error) {
        console.log({Login_Error: error.message})
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}


export async function sign(payload, secret) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60* 60 * 24; // 24 * one hour

    return new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret));
}