import React from 'react'

export default function Item({params}) {
    console.log({params})
  return (
    <section className='container'>
        <div className="title">Item - {params.item}</div>
    </section>
  )
}
