'use client'

import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, LoadingOverlay, Menu, Modal, NumberInput, TextInput } from "@mantine/core";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useApi from "@/lib/useApi";
import Overlay from "@/components/Overlay";

export default function ManagerAction({ item }) {
    const [openedActionModal, { open: openActionModal, close: closeActionModal }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState(item)
    const router = useRouter()
    const { addRequest, deleteItem, editItem } = useApi()


    const handleDelete = () => {
        let loadingPromise = toast.loading("Loading...")
        deleteItem.mutate({ id: item.id }, {
            onSuccess: (data) => {
                toast.success("Succesfully Delted!", { id: loadingPromise })
                router.push('/main-lab')
            },
            onError: (e) => {
                console.log(e)
                toast.error(e?.message || "Some error arised", { id: loadingPromise })
            },
        })

    }

    const ActionModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, damaged: selectedItem.damaged, amount: undefined })

        const handleChange = (value, name) => {
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            // setOverlay(true)
            let loadingPromise = toast.loading("Loading...")
            e.preventDefault()
            let itemObj = {
                ...formValue,
                itemId: item.id,
                req_type: selectedItem?.action == 1 ? 'restock' : selectedItem?.action == 2 ? 'repair' : 'demand',
                role: 'manager',
                lab: null,
            }

            addRequest.mutate({ data: itemObj }, {
                onSuccess: (data) => {
                    toast.success("Succesfully sent request!", { id: loadingPromise })
                    setFormValue({ name: '', description: '', available: '', damaged: '', amount: null })
                    closeActionModal()
                },
                onError: (e) => {
                    console.log(e)
                    toast.error(e?.message || "Some error arised", { id: loadingPromise })
                },
            })
        }

        const handleEdit = (e) => {
            // setOverlay(true)
            let loadingPromise = toast.loading("Loading...")
            e.preventDefault()
            const { amount, ...i } = formValue
            editItem.mutate({ data: i, id: item.id }, {
                onSuccess: (data) => {
                    toast.success("Succesfully Edited!", { id: loadingPromise })
                    setFormValue({ name: '', description: '', available: '', damaged: '', amount: null })
                    closeActionModal()
                },
                onError: (e) => {
                    console.log(e)
                    toast.error(e?.message || "Some error arised", { id: loadingPromise })
                },
            })

        }
        return (
            <Modal opened={openedActionModal} onClose={closeActionModal} title={<div className="title mt-6">{selectedItem.title}</div>}>

                <form
                    className="space-y-4"
                    onSubmit={selectedItem.action ? handleSubmit : handleEdit}
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
                    {selectedItem?.action ? <NumberInput
                        min={0}
                        label="Amount"
                        name="amount"
                        placeholder='Amount of request items'
                        onChange={(e) => handleChange(e, 'amount')}
                        withAsterisk
                        required
                        value={formValue.amount}
                    // error={errors.email}
                    /> : null}
                    <div className="flex items-center justify-center gap-4">
                        <Button type="submit" fullWidth>Submit</Button>
                        <Button onClick={closeActionModal} fullWidth variant="outline" color="red">Cancel</Button>
                    </div>
                </form>

            </Modal>
        )
    }

    if(!item) return <></>
    return (
        <>
            <Overlay isLoading={addRequest.isPending || editItem.isPending || deleteItem.isPending} />
            <>
                <Menu width={200} shadow="md">
                    <Menu.Target>
                        <Button size="xs" className='size-sm'>Action</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Request for Restock", action: 1 })
                            }}
                        >
                            Request For Restock
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Request for Repair", action: 2 })
                            }}
                        >
                            Request For Repair
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            color="blue"
                            onClick={() => {
                                openActionModal()
                                setSelectedItem({ ...item, title: "Edit Item", })
                            }}
                        >
                            Edit Item
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                            onClick={handleDelete}
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
