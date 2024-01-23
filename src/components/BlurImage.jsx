'use client'

import Image from 'next/image'
import React, { useState } from 'react'

export default function BlurImage({ src, alt, className, id = 0 }) {
    const [loading, setLoading] = useState(true)
    return (
        <div className=' h-full w-full overflow-hidden'>
            <Image
                src={src}
                alt={alt}
                width={500}
                height={400}
                placeholder='blur'
                blurDataURL={src}
                loading='lazy'
                className={`transition ease-in-out flex justify-center items-center duration-500 ${loading ? 'blur-xl scale-125' : 'blur-0 scale-100'} ${className}`}
                onLoad={() => setTimeout(() => setLoading(false), id * 200)}
            />
        </div>
    )
}
