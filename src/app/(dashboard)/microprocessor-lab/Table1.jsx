'use client'

import React, { useCallback, useMemo, useState } from "react";
import { HiOutlineDotsVertical, HiPlus, HiSearch } from "react-icons/hi";
import BlurImage from "@/components/BlurImage";
import { ActionIcon, Autocomplete, Button, Menu, Modal, NumberInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Table1() {
    const [openedActionModal, { open: openActionModal, close: closeActionModal }] = useDisclosure(false);
    const [openedReqNewItemModal, { open: openReqNewItemModal, close: closeReqNewItemModal }] = useDisclosure(false);
    const [openedAddNewItemModal, { open: openAddNewItemModal, close: closeAddNewItemModal }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState({})
    const [filterValue, setFilterValue] = useState("");
    const [filterLists, setFilterLists] = useState(lists);

    const onSearchChange = (e) => {
        let value = e.target.value
        if (value) {
            setFilterValue(value);
            setFilterLists(lists.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
        } else {
            setFilterValue("");
            setFilterLists(lists);
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
                        min={0}
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
                        min={0}
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
                        min={0}
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
                        min={0}
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

    const ActionModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, damaged: selectedItem.damaged, req_item: undefined })

        const handleChange = (e) => {
            setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
                        onChange={handleChange}
                        withAsterisk
                        value={formValue.description}
                    />
                    <TextInput
                        label="Available"
                        name="available"
                        placeholder='Amount of available item'
                        onChange={handleChange}
                        withAsterisk
                        value={formValue.available}
                    />
                    <TextInput
                        label="Damaged"
                        name="damaged"
                        placeholder='Amount of damaged items'
                        onChange={handleChange}
                        withAsterisk
                        value={formValue.damaged}
                    />
                    {selectedItem.id != 3 && <TextInput
                        label="Amount"
                        name="req_item"
                        placeholder='Amount of request items'
                        onChange={handleChange}
                        withAsterisk
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
        <div className="space-y-2">
            <div className="rounded-md space-y-3 overflow-x-auto max-w-full border border-blight-1 relative bg-white p-4">
                <div className="sticky left-0 space-y-2">
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
                <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                        <tr>
                            <th>SL NO.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Available</th>
                            <th>Damaged</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterLists.map((item, i) => (
                                <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                    <td>{i + 1}</td>
                                    <td className="max-w-[80px] p-1">
                                        <div className={'overflow-hidden min-w-min'}>
                                            {
                                                item.image ?
                                                    <BlurImage src={item.image} alt='item image' /> :
                                                    <></>
                                            }
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.available}</td>
                                    <td>{item.damaged}</td>
                                    <td>
                                        <>
                                            <Menu width={200} shadow="md">
                                                <Menu.Target>
                                                    <ActionIcon
                                                        variant="transparent"
                                                        size='sm'
                                                        color="#000"
                                                    >
                                                        <HiOutlineDotsVertical size={16} />
                                                    </ActionIcon>
                                                </Menu.Target>

                                                <Menu.Dropdown>
                                                    <Menu.Item
                                                        onClick={() => {
                                                            setSelectedItem({ ...item, title: "Request for Restock", id: 1 })
                                                            openActionModal()
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
                                                            setSelectedItem({ ...item, title: "Edit", id: 3 })
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
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <ActionModal />
            <ReqNewItemModal />
            <AddNewItemModal />
        </div>
    );
}


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

