'use client'

import BlurImage from '@/components/BlurImage'
import React from 'react'
import DemandItem from './DemandItem'
import ManagerAction from './ManagerAction';

export default function Item({ params }) {

  return (
    <section className='container'>
      <div className="card max-w-[800px] mx-auto space-y-4 bg-white rounded-md p-4 border border-blight-1">
        <div className=''>
          <BlurImage src={'/books/2.webp'} alt='Item Image' className='max-h-[400px] w-auto mx-auto !overflow-hidden' />
        </div>
        <div className='flex justify-between sm:items-end sm:flex-row flex-col gap-4'>
          <div>
            <div className="title">Item - {params.item}</div>
            <div className='gap-4 flex items-center'>
              <div className='chip px-2 !text'>Available - 50</div>
              <div className='chip px-2 r !text'>Damaged - 50</div>
            </div>
          </div>
          <div className='gap-4 flex'>
            <ManagerAction />
            <DemandItem />
          </div>
        </div>

        <div className='text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam delectus non commodi ipsam, veniam adipisci sint cum enim, a repellat quis culpa consequatur quae libero perspiciatis et.</div>

      </div>
    </section>
  )
}


const selectedItem = {
  name: 'PC',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, eligendi?',
  available: 18,
  damaged: 4,
}