'use client'

import { Button, PasswordInput, TextInput } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

export default async function SigIn() {
    return (

        <section className="container">
            <div className="flex flex-col items-center justify-center mx-auto mt-8">
                <div className="w-full md:bg-light md:shadow rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-dark dark:border-bdark-1">
                    <div className="space-y-4 md:space-y-6 sm:p-8 px-4 py-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Log in
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <TextInput
                                label="Email"
                                placeholder='Enter your Email'
                                // onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                // value={formik.values.email}
                                withAsterisk
                            // error={errors.email}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder='Enter your Password'
                                // onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                // value={formik.values.email}
                                withAsterisk
                            // error={errors.email}
                            />
                            <Button
                                fullWidth
                                component={Link}
                                href='/'
                                // type='submit'
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
    )
}
