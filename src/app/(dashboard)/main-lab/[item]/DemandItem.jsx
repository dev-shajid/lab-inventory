'use client'

import React, { useState } from "react";
import { Button, Modal, NumberInput, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUserContext } from "@/context/ContextProvider";
import toast from "react-hot-toast";
import useApi from "@/lib/useApi";

export default function DemandItem({ item: selectedItem }) {
    const [openedReqNewItemModal, { open: openReqNewItemModal, close: closeReqNewItemModal }] = useDisclosure(false);
    const { user } = useUserContext()
    const { addRequest } = useApi()

    const ReqNewItemModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, lab: user?.lab, damaged: selectedItem.damaged, amount: undefined })

        const handleChange = (value, name) => {
            // console.log({value, name})
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            let loadingPromise = toast.loading("Loading...")
            let itemObj = {
                ...formValue,
                itemId: selectedItem.id,
                req_type: 'demand',
                role: user?.role,
                lab: user?.lab,
            }

            addRequest.mutate({ data: itemObj }, {
                onSuccess: (data) => {
                    toast.success("Succesfully sent request!", { id: loadingPromise })
                    setFormValue({ name: '', description: '', available: '', damaged: '', amount: null })
                    closeReqNewItemModal()
                },
                onError: (e) => {
                    console.log(e)
                    toast.error(e?.message || "Some error arised", { id: loadingPromise })
                },
            })
        }

        return (
            <Modal opened={openedReqNewItemModal} onClose={closeReqNewItemModal} title={<div className="title mt-6">Request this Item</div>}>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        label="Name"
                        required
                        readOnly
                        disabled
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
                        required
                        readOnly
                        disabled
                        value={formValue.lab}
                        data={[
                            { value: 'os', label: 'OS Lab' },
                            { value: 'computer', label: 'Computer Lab' },
                            { value: 'microprocessor', label: 'Microprocessor Lab' },
                        ]}
                    />
                    <NumberInput
                        min={0}
                        label="Available"
                        name="available"
                        placeholder='Amount of available item'
                        onChange={(e) => handleChange(e, 'available')}
                        value={formValue.available}
                        required
                        readOnly
                        disabled
                    />
                    <NumberInput
                        min={0}
                        label="Damaged"
                        name="damaged"
                        placeholder='Amount of damaged items'
                        onChange={(e) => handleChange(e, 'damaged')}
                        value={formValue.damaged}
                        required
                        readOnly
                        disabled
                    />
                    {selectedItem.account != 3 && <NumberInput
                        min={0}
                        label="Amount"
                        name="amount"
                        placeholder='Amount of request items'
                        onChange={(e) => handleChange(e, 'amount')}
                        withAsterisk
                        required
                        value={formValue.amount}
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
