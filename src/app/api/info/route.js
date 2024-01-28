import db from "@/lib/db";
import User from "@/models/User";

export const POST = async (req) => {
    try {
        await db.connect()
        const info=await req.json()
        const items = await User.findOne(info)
        // console.log(items)
        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}