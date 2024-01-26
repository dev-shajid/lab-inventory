import { Button, PasswordInput, TextInput } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

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
                <div className="w-full md:bg-light rounded-lg md:shadow darks:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="space-y-4 md:space-y-6 sm:p-8 px-4 py-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create a new account
                        </h1>
                        <form className="space-y-4 md:space-y-6"
                        >
                            <TextInput
                                label="Name"
                                placeholder='Enter your Name'
                                // onChange={(e) => formik.setFieldValue('email', e.target.value)}
                                // value={formik.values.email}
                                withAsterisk
                                // error={errors.email}
                            />
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
                                Sing up
                            </Button>
                            <div className="text-center text-sm font-light text-gray-500 darks:text-gray-400">
                                Already have an account?
                                <Link href='/signin' className="font-medium text-primary-600 md:hover:underline darks:text-primary-500 underline">Sign in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}