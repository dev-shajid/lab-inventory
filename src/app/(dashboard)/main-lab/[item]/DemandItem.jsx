'use client'

import React, { useState } from "react";
import { Button, Modal, NumberInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function DemandItem() {
    const [openedReqNewItemModal, { open: openReqNewItemModal, close: closeReqNewItemModal }] = useDisclosure(false);

    const ReqNewItemModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, lab: selectedItem.lab, damaged: selectedItem.damaged, req_item: undefined })

        const handleChange = (e) => {
            setFormValue((prev) => ({ ...prev, req_item: e }))
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
                        readOnly
                        value={formValue.description}
                    />
                    <TextInput
                        label="Lab"
                        readOnly
                        value={formValue.lab}
                    />
                    <TextInput
                        label="Available"
                        readOnly
                        value={formValue.available}
                    />
                    <TextInput
                        label="Damaged"
                        readOnly
                        value={formValue.damaged}
                    />
                    <NumberInput
                        label="Amount"
                        name="req_item"
                        placeholder='Amount of request items'
                        onChange={handleChange}
                        value={formValue.req_item}
                        withAsterisk
                        required
                        min={0}
                    // error={errors.email}
                    />
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
                className='size-sm '
                onClick={() => {
                    openReqNewItemModal()
                }}
            >
                Demand this Item
            </Button>
            <ReqNewItemModal />
        </>
    );
}

const selectedItem={
    name: 'PC',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, eligendi?',
    available: 18,
    lab: "OS Lab",
    damaged: 4,
}