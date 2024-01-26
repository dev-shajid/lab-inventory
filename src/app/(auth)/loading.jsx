import { Loader } from '@mantine/core'
import React from 'react'

export default function loading() {
    return (
        <section className='container py-16 h-screen gap-3 flex justify-center items-center'>
            <Loader size='30' aria-label='loader' loaderprops={{ children: 'Loading...' }} />
            <p className='text-base'>Loading...</p>
        </section>
    )
}
