'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { signOut, useSession } from 'next-auth/react'
import { Loader } from '@mantine/core'
import { useUserContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'

export default function Layout({ children, authUser }) {
    const { data: session, status } = useSession()
    const { dispatch, user } = useUserContext()
    const [isLoading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        // console.log(JSON.parse(authUser.value))
        if (JSON.parse(authUser.value)) dispatch({ type: 'ADD_USER', payload: JSON.parse(authUser.value) })
        else signOut()
    }, [])

    useEffect(() => {
        setLoading(true)
        if (status === "unauthenticated") {
            signOut()
            router.push("/signin");
        } else if (status === "authenticated") {
            setLoading(false)
        }
    }, [status])

    if (isLoading || status == 'loading') return (
        <section className='container py-16 h-screen gap-3 flex justify-center items-center'>
            <Loader size='30' aria-label='loader' loaderprops={{ children: 'Loading...' }} />
            <p className='text-base'>Loading...</p>
        </section>
    )
    return (
        <>
            <main className="bg-light min-h-[100vh] flex md:flex-row flex-col md:gap-y-0 gap-y-4 w-full relative">
                <Sidebar session={session} />
                <div className="flex-1 max-w-full overflow-hidden">
                    {children}
                </div>
            </main>
        </>
    )
}
