'use client'

import React, { useState } from "react";
import { Button, Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function DemandItem() {
    const [openedReqNewItemModal, { open: openReqNewItemModal, close: closeReqNewItemModal }] = useDisclosure(false);

    const ReqNewItemModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, lab: selectedItem.lab, damaged: selectedItem.damaged, req_item: undefined })

        const handleChange = (value, name) => {
            // console.log({value, name})
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            alert(JSON.stringify(formValue, null, 2))
            setFormValue({ name: '', description: '', available: '', damaged: '', lab: '', req_item: undefined })
            closeReqNewItemModal()
        }

        return (
            <Modal opened={openedReqNewItemModal} onClose={closeReqNewItemModal} title={<div className="title mt-6">Request this Item</div>}>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        label="Name"
                        readOnly
                        value={formValue.name}
                    />
                    <TextInput
                        label="Description"
                        name="description"
                        placeholder='Enter description of item'
                        onChange={(e) => handleChange(e.target.value, 'description')}
                        value={formValue.description}
                    />
                    <Select
                        label="Lab"
                        name="lab"
                        placeholder='Enter description of item'
                        onChange={(e) => handleChange(e, 'lab')}
                        withAsterisk
                        required
                        value={formValue.lab}
                        data={['OS Lab', 'Computer Lab', 'Microprocessor Lab']}
                    />
                    <NumberInput
                        min={0}
                        label="Available"
                        name="available"
                        placeholder='Amount of available item'
                        onChange={(e) => handleChange(e, 'available')}
                        withAsterisk
                        required
                        value={formValue.available}
                        readOnly
                    />
                    <NumberInput
                        min={0}
                        label="Damaged"
                        name="damaged"
                        placeholder='Amount of damaged items'
                        onChange={(e) => handleChange(e, 'damaged')}
                        withAsterisk
                        required
                        value={formValue.damaged}
                        readOnly
                    />
                    {selectedItem.id != 3 && <NumberInput
                        min={0}
                        label="Amount"
                        name="req_item"
                        placeholder='Amount of request items'
                        onChange={(e) => handleChange(e, 'req_item')}
                        withAsterisk
                        required
                        value={formValue.req_item}
                    // error={errors.email}
                    />}
                    <div className="flex items-center justify-center gap-4">
                        <Button type="submit" fullWidth>Submit</Button>
                        <Button onClick={closeReqNewItemModal} fullWidth variant="outline" color="red">Cancel</Button>
                    </div>
                </form>

            </Modal>
        )
    }

    return (
        <>
            <Button
                size="xs"
                className='size-sm'
                onClick={() => {
                    openReqNewItemModal()
                }}
            >
                Request this Item
            </Button>
            <ReqNewItemModal />
        </>
    );
}

const selectedItem = {
    name: 'PC',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, eligendi?',
    available: 18,
    lab: "OS Lab",
    damaged: 4,
}