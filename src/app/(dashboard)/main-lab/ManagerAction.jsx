'use client'

import React, { useCallback, useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Autocomplete, Button, Modal, NumberInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Products from "@/components/Products";
import { useFormik } from "formik";
import { submitAddItemManagerForm } from "@/helper/api";
import { validateAddItemManagerForm } from "@/helper/validate";

export default function ManagerAction() {
    const [openedReqNewItemModal, { open: openReqNewItemModal, close: closeReqNewItemModal }] = useDisclosure(false);
    const [openedAddNewItemModal, { open: openAddNewItemModal, close: closeAddNewItemModal }] = useDisclosure(false);
    const [filterValue, setFilterValue] = useState("");
    const [filterLists, setFilterLists] = useState(products);

    const onSearchChange = (e) => {
        let value = e.target.value
        if (value) {
            setFilterValue(value);
            setFilterLists(products.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
        } else {
            setFilterValue("");
            setFilterLists(products);
        }
    }


    const AddNewItemModal = () => {
        const [addItemErrors, setAddItemErrors] = useState({})
        const [formValue, setFormValue] = useState({ name: '', description: '', available: '', damaged: '' })

        const formik = useFormik({
            initialValues: {
                name: '', description: '', available: '', damaged: ''
            },
            validate: async (values) => {
                setAddItemErrors(await validateAddItemManagerForm(values))
            },
            validateOnBlur: false,
            validateOnChange: false,
            onSubmit: async (values) => {
                if (!Object.keys(addItemErrors).length) {
                    e.preventDefault()
                    await submitAddItemManagerForm(values)
                    setFilterLists((prev) => [...prev, formValue])
                    closeAddNewItemModal()
                }
            }
        })

        const handleProfile = async (e) => {
            const base64 = await convertToBase64(e.target.files[0]);
            formik.setFieldValue('profile', base64);
            console.log(formik.values.profile);
        }

        return (
            <Modal opened={openedAddNewItemModal} onClose={closeAddNewItemModal} title={<div className="title mt-6">Add new Item</div>}>

                <form
                    className="space-y-4"
                    onSubmit={formik.handleSubmit}
                >
                    <TextInput
                        label="Name"
                        placeholder="Enter item name"
                        withAsterisk
                        {...formik.getFieldProps('name')}
                        inputProps={{
                            autoComplete: 'off',
                            form: {
                                autoComplete: 'off',
                            },
                        }}
                        error={addItemErrors.name ? true : false}
                        helperText={addItemErrors.name}
                    />
                    <TextInput
                        label="Description"
                        placeholder="Enter item description"
                        {...formik.getFieldProps('description')}
                        inputProps={{
                            autoComplete: 'off',
                            form: {
                                autoComplete: 'off',
                            },
                        }}
                        error={addItemErrors.description ? true : false}
                        helperText={addItemErrors.description}
                    />
                    <NumberInput
                        min={0}
                        label="Available"
                        placeholder="Enter amount of available item"
                        withAsterisk
                        {...formik.getFieldProps('available')}
                        variant="outlined"
                        color="red"
                        inputProps={{
                            autoComplete: 'off',
                            form: {
                                autoComplete: 'off',
                            },
                        }}
                        error={addItemErrors.available ? true : false}
                        helperText={addItemErrors.available}
                    />
                    <NumberInput
                        label="Damaged"
                        placeholder="Enter amount of damaged item"
                        withAsterisk
                        min={0}
                        {...formik.getFieldProps('damaged')}
                        inputProps={{
                            autoComplete: 'off',
                            form: {
                                autoComplete: 'off',
                            },
                        }}
                        error={addItemErrors.damaged ? true : false}
                        helperText={addItemErrors.damaged}
                    />
                    <div className="flex items-center justify-center gap-4">
                        <Button type="submit" fullWidth>Submit</Button>
                        <Button onClick={closeAddNewItemModal} fullWidth variant="outline" color="red">Cancel</Button>
                    </div>
                </form>

            </Modal>
        )
    }

    const ReqNewItemModal = () => {
        const [formValue, setFormValue] = useState({ name: '', description: '', req_item: '' })

        const handleChange = (value, name) => {
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            alert(JSON.stringify(formValue, null, 2))
            setFormValue({ name: '', description: '', req_item: '' })
            closeReqNewItemModal()
        }
        return (
            <Modal opened={openedReqNewItemModal} onClose={closeReqNewItemModal} title={<div className="title mt-6">Request new Item</div>}>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <Autocomplete
                        label="Name"
                        placeholder="Enter item name"
                        nothingFound="Nothing found"
                        name='name'
                        value={formValue.name}
                        onChange={(e) => handleChange(e, 'name')}
                        data={animals}
                        withAsterisk
                        required
                    // error={errors.email}
                    />
                    <TextInput
                        label="Description"
                        placeholder="Enter item description"
                        value={formValue.description}
                        name="description"
                        onChange={(e) => handleChange(e.target.value, 'description')}
                    // error={errors.email}
                    />
                    <NumberInput
                        min={0}
                        label="Request Quantity"
                        placeholder="Quantity of request item"
                        name="available"
                        value={formValue.req_item}
                        onChange={(e) => handleChange(e, 'req_item')}
                        withAsterisk
                        required
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
            <div className="rounded-md space-y-3 overflow-x-auto max-w-full border border-blight-1 relative bg-white p-4">
                <div className="">
                    <div className="flex items-center justify-between flex-col lg:flex-row gap-4">
                        <TextInput
                            className="w-full lg:max-w-[44%]"
                            placeholder="Search by name..."
                            leftSectionPointerEvents="none"
                            leftSection={<HiSearch className="text-default-300" />}
                            value={filterValue}
                            onChange={onSearchChange}
                        />
                        <div className="space-x-2">
                            <Button
                                size="xs"
                                onClick={openReqNewItemModal}
                            >
                                Request for New Item
                            </Button>
                            <Button
                                size="xs"
                                onClick={openAddNewItemModal}
                                color="gray"
                            >
                                Add New Item
                            </Button>
                        </div>
                    </div>
                    <div className="flex">
                        <span className="text-gray-500 text-xs font-medium">Total {filterLists.length} items</span>
                    </div>
                </div>

                <Products products={filterLists} />
            </div>
            <ReqNewItemModal />
            <AddNewItemModal />
        </>
    );
}



const products = [
    {
        image: '/os/1.JPG',
        name: 'Ethernet cable',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/os/2.JPG',
        name: 'UPS',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/os/3.JPG',
        name: 'CPU',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/os/4.JPG',
        name: 'Monitor',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/os/5.JPG',
        name: 'Mouse',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/os/6.JPG',
        name: 'Keyboard',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/os/7.JPG',
        name: 'Gpu',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/os/8.JPG',
        name: 'Projector',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/os/9.JPG',
        name: 'Multiplug',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/micro/3.jpg',
        name: 'Breadboard',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/micro/8.JPG',
        name: 'Transistor',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/micro/7.JPG',
        name: 'Capacitor',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/micro/2.JPG',
        name: 'Resister',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/micro/6.JPG',
        name: 'Wire',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/micro/1.WEBP',
        name: 'IC',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/micro/5.JPG',
        name: 'Seven Segment Display',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/lab1/pc.jpeg',
        name: 'PC',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
        image: '/lab1/ups.png',
        name: 'UPS',
        description: 'This is a very long text that describes the item.',
        available: 15,
        damaged: 2,
    },
]

export const animals = [
    { label: 'monkey', value: 'Monkey' },
    { label: 'snake', value: 'Snake' },
    { label: 'lion', value: 'Lion' },
    { label: 'tiger', value: 'Tiger' },
    { label: 'bird', value: 'Bird' },
    { label: 'fish', value: 'Fish' },
    { label: 'elephant', value: 'Elephant' },
    { label: 'cat', value: 'Cat' },
    { label: 'rabbit', value: 'Rabbit' }
]