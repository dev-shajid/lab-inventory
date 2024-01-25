'use client'

import React, { useCallback, useMemo, useState } from "react";
import { HiOutlineDotsVertical, HiPlus, HiSearch } from "react-icons/hi";
import BlurImage from "@/components/BlurImage";
import { ActionIcon, Autocomplete, Button, Menu, Modal, NumberInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Products from "@/components/Products";

export default function ManagerAction() {
    const [openedReqNewItemModal, { open: openReqNewItemModal, close: closeReqNewItemModal }] = useDisclosure(false);
    const [openedAddNewItemModal, { open: openAddNewItemModal, close: closeAddNewItemModal }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState({})
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
        const [formValue, setFormValue] = useState({ name: '', description: '', available: '', damaged: '' })

        const handleChange = (value, name) => {
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e, onClose) => {
            e.preventDefault()
            setFilterLists((prev) => [...prev, formValue])
            setFormValue({ name: '', description: '', available: '', damaged: '' })
            closeAddNewItemModal()
        }
        return (
            <Modal opened={openedAddNewItemModal} onClose={closeAddNewItemModal} title={<div className="title mt-6">Add new Item</div>}>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        label="Name"
                        placeholder="Enter item name"
                        name='name'
                        value={formValue.name}
                        onChange={(e) => handleChange(e.target.value, 'name')}
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
                        label="Available"
                        placeholder="Enter amount of available item"
                        name="available"
                        value={formValue.available}
                        onChange={(e) => handleChange(e, 'available')}
                        withAsterisk
                        required
                    // error={errors.email}
                    />
                    <NumberInput
                        label="Damaged"
                        placeholder="Enter amount of damaged item"
                        name="damaged"
                        value={formValue.damaged}
                        onChange={(e) => handleChange(e, 'damaged')}
                        withAsterisk
                        required
                    // error={errors.email}
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
        const [formValue, setFormValue] = useState({ name: '', description: '', available: '', damaged: '' })

        const handleChange = (value, name) => {
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            alert(JSON.stringify(formValue, null, 2))
            setFormValue({ name: '', description: '', available: '', damaged: '' })
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
                        label="Available"
                        placeholder="Enter amount of available item"
                        name="available"
                        value={formValue.available}
                        onChange={(e) => handleChange(e, 'available')}
                        withAsterisk
                        required
                    // error={errors.email}
                    />
                    <NumberInput
                        label="Damaged"
                        placeholder="Enter amount of damaged item"
                        name="damaged"
                        value={formValue.damaged}
                        onChange={(e) => handleChange(e, 'damaged')}
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
                                Reques for New Item
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

                <Products products={filterLists}/>
            </div>
            <ReqNewItemModal />
            <AddNewItemModal />
        </>
    );
}



const products = [
    {
        image: "/books/1.webp",
        name: "Wall Frame-Cholo Rober Kache-WF012",
    },
    {
        image: "/books/2.webp",
        name: "Wall Frame-Bismillah-WF001",
    },
    {
        image: "/books/3.webp",
        name: "Wall Frame-Amader Paotaka-WF018",
    },
    {
        image: "/books/4.webp",
        name: "Wall Frame-Allahu Akbar-WF003",
    },
    {
        image: "/books/5.webp",
        name: "Wall Frame-Alhamdulillah-WF002",
    },
    {
        image: "/books/6.webp",
        name: "Wall Frame-Alhamdulillah Calligraphy-WF016",
    }
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