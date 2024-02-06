import db from "@/lib/db";
import User from "@/models/User";
import verifyToken from "@/lib/verifyToken";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await db.connect()
        let token = req?.cookies?.get('token')?.value || ''
        let decode = token ? await verifyToken(token) : null

        // console.log({decode})

        if (!decode || !decode?._id) throw new Error("Unauthorized user! sigin again")
        const user = await User.findOne({ _id: decode._id, isVerified: true })
        return NextResponse.json({ message:"Authorized Succesfully!", user, success: true, }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}