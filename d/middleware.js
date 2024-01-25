import { NextResponse } from "next/server";
import Auth from "./lib/auth";

export default async function middleware(req) {
    let decoded = await Auth(req)

    let path = req.nextUrl.pathname
    if (path.startsWith('/login') || path.startsWith('/register')) {
        // console.log({page:"Login"});
        if (decoded) {
            // return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    }
    else {
        if (!decoded) {
            // console.log({decoded});
            return NextResponse.redirect(new URL(`/login?callback=${req.nextUrl.pathname}`, req.url))
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/', 
        '/lab1', '/lab2', '/lab3',
        '/sigin', '/signup',
    ]
}