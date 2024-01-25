import BlurImage from '@/components/BlurImage'
import { Chip } from '@nextui-org/react'
import React from 'react'

export default function Item({ params }) {
  console.log({ params })
  return (
    <section className='container'>
      <div className="card max-w-[800px] mx-auto space-y-4 bg-white rounded-md p-4 border border-blight-1">
        <div className=''>
          <BlurImage src={'/books/1.webp'} alt='Item Image' className='text-center mx-auto max-h-[400px] w-auto' />
        </div>
        <div>
          <div className="title">Item - {params.item}</div>
          <div className='chip !text'>Available - 50</div>
          <div className='chip r !text'>Damaged - 50</div>
        </div>
        <div>
          <button varient='border' sizes="sm" color='#000' className='bg-indigo-200 text-indigo-700 border-indigo-700'>Request for Item</button>
        </div>
        <div className='text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam delectus non commodi ipsam, veniam adipisci sint cum enim, a repellat quis culpa consequatur quae libero perspiciatis et.</div>

      </div>
    </section>
  )
}
