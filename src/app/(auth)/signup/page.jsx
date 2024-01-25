import { Button, input } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { FcGoogle } from "react-icons/fc";

export default async function SignUp() {
    // const [overlayLoading, setOverlay] = useState(false);
    // const [isLoading, setLoading] = useState(true);
    // const router = useRouter()
    // const { data: session, status } = useSession()

    // const form = useForm({
    //     initialValues: {
    //         name: 'shajid',
    //         email: 'sajidislam729@gmail.com',
    //         password: 'shajib786',
    //     },
    //     validate: {
    //         name: (value) => (value.length < 2 ? 'name is too short' : null),
    //         email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Email"),
    //         password: (value) => (value.length < 5 ? 'Password length should be atleast 5' : null),
    //     },
    // });

    // const handleSubmit = async (values) => {
    //     setOverlay(true)
    //     let loadingPromise = toast.loading("Loading...")
    //     try {
    //         await new Promise(res => setTimeout(res, 2000));

    //         const res = await fetch('/api/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(values)
    //         })
    //         const data = await res.json()
    //         console.log(data);
    //         if (!res.ok) {
    //             toast.error(data?.error || "Some error arised", { id: loadingPromise })
    //         } else {
    //             toast.success("Successfully Registered...", { id: loadingPromise })
    //             router.push('/login')
    //         }
    //     } catch (error) {
    //         toast.error(error?.message || "Some error arised", { id: loadingPromise })
    //     }
    //     setOverlay(false)
    // }

    // useEffect(() => {
    //     setLoading(true)
    //     if (status === "unauthenticated") {
    //         setLoading(false)
    //     } else if (status === "authenticated") {
    //         router.push(searchParams.callback || "/");
    //     }
    // }, [status]);

    // if (isLoading) return <div className='text-2xl text-center'>Loading...</div>
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