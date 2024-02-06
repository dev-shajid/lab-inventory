import { NextResponse } from "next/server";
import verifyToken from "./lib/verifyToken";
import { cookies } from "next/headers";

export default async function middleware(req) {
    try {
        let path = req?.nextUrl?.pathname
        let token = req?.cookies?.get('token')?.value || ''
        // console.log({token, path})

        let decode = token ? await verifyToken(token) : null

        if (path?.startsWith('/signin') || path?.startsWith('/signup')) {
            if (decode?._id) {
                return NextResponse.redirect(new URL('/', req.url))
            }
            let response = NextResponse.next()
            return response
        }
        else if (path?.startsWith('/handle-demand')) {
            if (decode?.role == 'manager') {
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL('/', req.url))
        }
        else if (path?.startsWith('/admin')) {
            if (decode?.role == 'admin') {
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL('/', req.url))
        }
        else {
            if (!decode || !decode?._id) {
                let response = NextResponse.redirect(new URL('/signin', req.url))
                response.cookies.delete('token')
                return response
            }
            return NextResponse.next()
        }
    } catch (error) {
        console.log({ error })
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export const config = {
    matcher: [
        '/',
        '/admin',
        '/main-lab/:path*',
        '/os-lab', '/computer-lab', '/microprocessor-lab',
        '/handle-demand',
        '/request-management-index',
        '/signin', '/signup',
    ]
}