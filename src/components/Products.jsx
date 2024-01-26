'use client'

import Link from 'next/link'
import BlurImage from './BlurImage'


export default function Products({products}) {
  return (
    <>
      <div>
        <div className="title">Items Gallery</div>
        <div style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))" }} className="grid gap-4 justify-evenly">
          {
            products.map((product, i) => (
              <div key={i} className='max-w-[200px]'>
                <Link href={`/main-lab/${i + 1}`}>
                  <div className='bg-white border border-blight-1 h-full flex flex-col relative rounded-md overflow-hidden shadow-sm md:hover:shadow-md duration-150'>
                    <div className='h-full min-w-full w-full !aspect-[1/1] flex items-center justify-center'>
                      {
                        product.image?
                        <BlurImage src={product.image} alt="Product Image" id={i} /> :
                        <></>
                      }
                    </div>
                    <div className='p-2 pb-4 flex h-full flex-col justify-between'>
                      <div className="title2 text-sm font-medium">{product.name}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}