import BlurImage from '@/components/BlurImage'
import { Button } from '@mantine/core'
import React from 'react'
import DemandItem from './DemandItem'

export default function Item({ params }) {

  return (
    <section className='container'>
      <div className="card max-w-[800px] mx-auto space-y-4 bg-white rounded-md p-4 border border-blight-1">
        <div className='flex'>
          <div className='mx-auto !overflow-hidden'>
            <BlurImage src={'/books/1.webp'} alt='Item Image' className='max-h-[400px] w-auto mx-auto' />
          </div>
        </div>
        <div className='flex justify-between sm:items-end sm:flex-row flex-col gap-4'>
          <div>
            <div className="title">Item - {params.item}</div>
            <div className='chip !text'>Available - 50</div>
            <div className='chip r !text'>Damaged - 50</div>
          </div>
          <div>
            <DemandItem />
          </div>
        </div>
        <div>
        </div>
        <div className='text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam delectus non commodi ipsam, veniam adipisci sint cum enim, a repellat quis culpa consequatur quae libero perspiciatis et.</div>

      </div>
    </section>
  )
}
