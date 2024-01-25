'use client'

import BlurImage from '@/components/BlurImage'
import React, { useState } from 'react'
import DemandItem from './DemandItem'
import { LiaEditSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { ActionIcon, Button, Modal, NumberInput, TextInput } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";

export default function Item({ params }) {
  const [openedEditNewItemModal, { open: openEditNewItemModal, close: closeEditNewItemModal }] = useDisclosure(false);

  const EditNewItemModal = () => {
    const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, damaged: selectedItem.damaged })

    const handleChange = (e) => {
      setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      alert(JSON.stringify(formValue, null, 2))
      setFormValue({ name: '', description: '', available: '', damaged: '', req_item: null })
      closeEditNewItemModal()
    }

    return (
      <Modal opened={openedEditNewItemModal} onClose={closeEditNewItemModal} title={<div className="title mt-6">Request new Item</div>}>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Name"
            name='name'
            placeholder='Enter name of item'
            value={formValue.name}
            onChange={handleChange}
            withAsterisk
            required
          />
          <TextInput
            label="Description"
            name='description'
            placeholder='Enter description of item'
            value={formValue.description}
            onChange={handleChange}
            withAsterisk
            required
          />
          <TextInput
            label="Available"
            name='available'
            placeholder='Amount of available items'
            value={formValue.available}
            onChange={handleChange}
            withAsterisk
            required
          />
          <TextInput
            label="Damaged"
            name='damaged'
            placeholder='Amount of Damaged items'
            value={formValue.damaged}
            onChange={handleChange}
            withAsterisk
            required
          // error={errors.email}
          />
          <div className="flex items-center justify-center gap-4">
            <Button type="submit" fullWidth>Submit</Button>
            <Button onClick={closeEditNewItemModal} fullWidth variant="outline" color="red">Cancel</Button>
          </div>
        </form>

      </Modal>
    )
  }

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

        <div className='space-x-4'>
          <ActionIcon onClick={openEditNewItemModal} variant="outline" color="violet" aria-label="Edit">
            <LiaEditSolid size={20} />
          </ActionIcon>
          <ActionIcon onClick={()=>alert("Deleted Item")} variant="outline" color="red" aria-label="Delete">
            <AiOutlineDelete size={20} />
          </ActionIcon>
        </div>

        <div className='text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam delectus non commodi ipsam, veniam adipisci sint cum enim, a repellat quis culpa consequatur quae libero perspiciatis et.</div>

      </div>
      <EditNewItemModal />
    </section>
  )
}


const selectedItem = {
  name: 'PC',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, eligendi?',
  available: 18,
  damaged: 4,
}