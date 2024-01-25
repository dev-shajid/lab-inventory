'use client'

import Link from 'next/link'
import BlurImage from './BlurImage'
import ReactStarsRating from 'react-awesome-stars-rating';
import { Skeleton } from '@nextui-org/react';


export default function Products() {
  return (
    <>
      <section>
        <div className="title">Items Gallery</div>
        <div style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))" }} className="grid gap-4">
          {
            products.map((product, i) => (
              <div key={i}>
                <Link href={`/main-inventory/${i+1}`}>
                  <div className='bg-white border border-blight-1 h-full flex flex-col relative rounded-md overflow-hidden shadow-sm md:hover:shadow-md duration-150'>
                    <div className='h-full min-w-full w-full !aspect-[1/1] bg-gray-300'>
                      <BlurImage src={product.image} alt="Product Image" id={i} />
                    </div>
                    <div className='p-2 pb-4 flex h-full flex-col justify-between'>
                      <div className="title2 text-sm font-medium">{product.title}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </section>
    </>
  )
}

const products = [
  {
    image: "/books/1.webp",
    title: "Wall Frame-Cholo Rober Kache-WF012",
    oldPrice: 790,
    price: 550,
    rating: "4"
  },
  {
    image: "/books/2.webp",
    title: "Wall Frame-Bismillah-WF001",
    oldPrice: 790,
    price: 550,
    rating: "4"
  },
  {
    image: "/books/3.webp",
    title: "Wall Frame-Amader Paotaka-WF018",
    oldPrice: 790,
    price: 550,
    rating: "4"
  },
  {
    image: "/books/4.webp",
    title: "Wall Frame-Allahu Akbar-WF003",
    oldPrice: 790,
    price: 550,
    rating: "4"
  },
  {
    image: "/books/5.webp",
    title: "Wall Frame-Alhamdulillah-WF002",
    oldPrice: 790,
    price: 550,
    rating: "4"
  },
  {
    image: "/books/6.webp",
    title: "Wall Frame-Alhamdulillah Calligraphy-WF016",
    oldPrice: 790,
    price: 550,
    rating: "4"
  }
]