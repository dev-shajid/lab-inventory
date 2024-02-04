import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function POST(req) {
    try {
        await db.connect()
        const { email, password: pass } = await req.json()
        // console.log({email,pass})

        const existUser = await User.findOne({ email })
        const { password, ...user }=existUser._doc
        // console.log({password,user})
        if (!user) throw new Error("User does not exist")
        // console.log("user exists");


        //check if pass is correct
        const validpass = await bcrypt.compare(pass, password)
        if (!validpass) throw new Error("Invalid pass!")
        if (!user.isVerified) throw new Error("User is not verified yet!")

        //create token data
        const tokenData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        //create token
        const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: '6d' });

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
        // console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}