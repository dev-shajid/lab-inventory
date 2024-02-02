'use client'

import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box, Divider, LoadingOverlay, PasswordInput, Loader } from '@mantine/core';
import { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useUserContext } from '@/context/ContextProvider';

export default function Login({ searchParams }) {
    const [overlayLoading, setOverlay] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter()
    const { dispatch } = useUserContext()

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Email"),
            password: (value) => (value.length < 5 ? 'Password length should be atleast 5' : null),
        },
    });

    const handleSubmit = async (values) => {
        setOverlay(true)
        let loadingPromise = toast.loading("Loading...")
        try {

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const data = await res.json()
            // console.log(res, data)
            if (res.status == 200) {
                router.push(searchParams.callback || '/')
                // dispatch({ type: 'ADD_USER', payload: data.user })
                toast.success(data?.message || "Login Successful", { id: loadingPromise })
            } else {
                toast.error(data?.error || "Some error arised", { id: loadingPromise })
            }
        } catch (error) {
            // toast.error(error?.message || "Some error arised", { id: loadingPromise })
            console.log(error)
        }
        setOverlay(false)
    }

    return (
        <section className="container pb-16 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center mx-auto mt-8 w-full">
                <div className="w-full md:bg-light md:shadow rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                    <LoadingOverlay visible={overlayLoading} overlayProps={{ blur: 2 }} loader={<></>} />
                    <div className="space-y-4 md:space-y-6 sm:p-8 px-4 py-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={form.onSubmit(handleSubmit)}>
                            <TextInput
                                label="Email"
                                placeholder='Enter your Email'
                                {...form.getInputProps('email')}
                                withAsterisk
                            />
                            <PasswordInput
                                label="Password"
                                placeholder='Enter your Password'
                                {...form.getInputProps('password')}
                                withAsterisk
                            />
                            <Button
                                fullWidth
                                type='submit'
                                className='w-full rounded-md !bg-blue-500'
                            >
                                Sing in
                            </Button>
                            <div>
                                <div className="text-center text-sm text-gray-500 gap-x-1 flex items-center justify-center">
                                    <p>Don’t have an account yet?</p>
                                    <Link href='/signup' className="font-medium text-primary-600 md:hover:underline underline text-blue-500">Sign up</Link>
                                </div>
                                <div className="flex items-center justify-center">
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-blue-500">Forgot password?</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}