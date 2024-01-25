import { Loader } from '@mantine/core'
import React from 'react'

export default function loading() {
    return (
        <section className='container py-16 flex justify-center h-full items-center'>
            <Loader size='30' aria-label='loader' loaderprops={{ children: 'Loading...' }} />
        </section>
    )
}
