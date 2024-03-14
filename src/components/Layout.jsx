'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { signOut, useSession } from 'next-auth/react'
import { Loader } from '@mantine/core'
import { useUserContext } from '@/context/ContextProvider'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { GetAuthUser } from '../../action/api'
import Loading from './Loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function Layout({ children }) {
    const { dispatch, user } = useUserContext()
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    async function apiAuthUser() {
        // let loadingPromise = toast.loading("Loading...")
        try {
            setIsLoading(true)
            const res = await GetAuthUser()
            if (res.success) {
                // console.log({ res })
                // toast.success(data.message || "Authorized Succesfully!", { id: loadingPromise })
                dispatch({ type: 'ADD_USER', payload: res.user })
            } else {
                // router.push('/signin')
                // toast.error(res?.error || "Not authorized, sign in please!", { id: loadingPromise })
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

    if (isLoading) return <Loading page />

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <main className="bg-light min-h-[100dvh] flex md:flex-row flex-col md:gap-y-0 gap-y-4 w-full relative">
                    <Sidebar />
                    <div className="flex-1 max-w-full overflow-hidden">
                        {children}
                    </div>
                </main>
            </QueryClientProvider>
        </>
    )
}
