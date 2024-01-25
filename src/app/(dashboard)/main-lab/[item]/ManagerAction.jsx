'use client'

import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Autocomplete, Button, Menu, Modal, NumberInput, TextInput } from "@mantine/core";

export default function ManagerAction() {
    const [openedActionModal, { open: openActionModal, close: closeActionModal }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState(item)


    const ActionModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, damaged: selectedItem.damaged, req_item: undefined })

        const handleChange = (value, name) => {
            // console.log({value, name})
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            alert(JSON.stringify(formValue, null, 2))
            setFormValue({ name: '', description: '', available: '', damaged: '', req_item: null })
            closeActionModal()
        }
        return (
            <Modal opened={openedActionModal} onClose={closeActionModal} title={<div className="title mt-6">{selectedItem.title}</div>}>

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
                        withAsterisk
                        required
                        value={formValue.description}
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
                        <Button onClick={closeActionModal} fullWidth variant="outline" color="red">Cancel</Button>
                    </div>
                </form>

            </Modal>
        )
    }

    return (
        <>
            <>
                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <Button className='size-sm'>Action</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Request for Restock", id: 1 })
                            }}
                        >
                            Request For Restock
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Request for Repair", id: 2 })
                            }}
                        >
                            Request For Repair
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            color="blue"
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Edit Item", id: 3 })
                            }}
                        >
                            Edit Item
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                            onClick={() => {
                                alert("Item delted!")
                            }}
                        >
                            Delete Item
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </>
            <ActionModal />
        </>
    );
}


const item = {
    name: 'PC',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, eligendi?',
    available: 18,
    lab: "OS Lab",
    damaged: 4,
}