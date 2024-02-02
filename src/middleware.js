import { NextResponse } from "next/server";
import verifyToken from "./lib/verifyToken";

export default async function middleware(req) {
    try {
        let path = req?.nextUrl?.pathname
        let token = req?.cookies?.get('token')?.value || ''
        // console.log({token, path})
        
        let decode = token ? await verifyToken(token) : null
    
        if (path?.startsWith('/signin') || path?.startsWith('/signup')) {
            if (decode) {
                return NextResponse.redirect(new URL('/', req.url))
            }
            return NextResponse.next()
        }
        else if (path?.startsWith('/handle-demand')) {
            if (decode.role=='manager') {
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL('/', req.url))
        }
        else if (path?.startsWith('/admin')) {
            if (decode.role=='admin') {
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL('/', req.url))
        }
        else {
            if (!decode) {
                return NextResponse.redirect(new URL(`/signin?callback=${req.nextUrl.pathname}`, req.url))
            }
            return NextResponse.next()
        }
    } catch (error) {
        console.log({error})
        throw new Error("Hello Error" || error.message)
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