import db from "@/lib/db";
import User from "@/models/User";

export const POST = async (req) => {
    await db.connect()
    try {
        await db.connect()
        const id=await req.json()
        const user = await User.findOneAndUpdate({ _id:id }, {role: 'asistant'})
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}