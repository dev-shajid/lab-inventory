import { Button, input } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FcGoogle } from "react-icons/fc";

export default async function SignUp() {
    return (
        <section className="container">
            <div className="flex flex-col items-center justify-center mx-auto mt-8">
                <div className="w-full md:bg-light rounded-lg md:shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-dark dark:border-bdark-1">
                    <div className="space-y-4 md:space-y-6 sm:p-8 px-4 py-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create a new account
                        </h1>
                        <form className="space-y-4 md:space-y-6"
                        >
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="bg-light-1 border border-gray-300 text-gray-900 sm:text-sm rounded-md outline-none focus:ring-1 focus:ring-blue-400 block w-full p-2.5 dark:bg-dark-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Jon Doe"
                                    required=""
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="bg-light-1 border border-gray-300 text-gray-900 sm:text-sm rounded-md outline-none focus:ring-1 focus:ring-blue-400 block w-full p-2.5 dark:bg-dark-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="abc@company.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="******"
                                    className="bg-light-1 border border-gray-300 text-gray-900 sm:text-sm rounded-md outline-none focus:ring-1 focus:ring-blue-400 block w-full p-2.5 dark:bg-dark-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                />
                            </div>
                            <Button
                                type='submit'
                                className='w-full rounded-md'
                                color='primary'
                            >
                                Sing up
                            </Button>
                            <div className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?
                                <Link href='/signin' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}