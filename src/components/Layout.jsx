'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { signOut, useSession } from 'next-auth/react'
import { Loader } from '@mantine/core'
import { useUserContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import toast from 'react-hot-toast'

export default function Layout({ children }) {
    const { dispatch, user } = useUserContext()
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    async function apiLogout() {
        // let loadingPromise = toast.loading("Loading...")
        setIsLoading(true)
        try {
            const res = await fetch('/api/auth/logout')
            const data = await res.json()
            if (res.status == 200) {
                router.push('/signin')
                // toast.success(data.message || "Logout Successfully!", { id: loadingPromise })
                // dispatch({ type: 'REMOVE_USER' })
            } else {
                // toast.error(data?.error || "Some error arised", { id: loadingPromise })
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    async function apiAuthUser() {
        // let loadingPromise = toast.loading("Loading...")
        try {
            setIsLoading(true)
            const res = await fetch('/api/auth/authUser')
            const data = await res.json()
            console.log({ res, data })
            if (res.status == 200) {
                // console.log(data)
                // toast.success(data.message || "Authorized Succesfully!", { id: loadingPromise })
                dispatch({ type: 'ADD_USER', payload: data.user })
            } else {
                apiLogout()
                // toast.error(data?.error || "Not authorized, sign in please!", { id: loadingPromise })
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!user) apiAuthUser()
    }, [])

    if (isLoading) return (
        <section className='container py-16 h-screen gap-3 flex justify-center items-center'>
            <AiOutlineLoading3Quarters size={28} className='animate-spin' />
            <p className='text-base'>Loading...</p>
        </section>
    )

    return (
        <>
            <main className="bg-light min-h-[100vh] flex md:flex-row flex-col md:gap-y-0 gap-y-4 w-full relative">
                <Sidebar />
                <div className="flex-1 max-w-full overflow-hidden">
                    {children}
                </div>
            </main>
        </>
    )
}
