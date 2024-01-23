import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function loading() {
    return (
        <section className='container py-16 flex justify-center h-full items-center'>
            <Spinner size='lg' label='Loading...' />
        </section>
    )
}
