'use client'

import React, { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure, Modal, ModalContent, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { HiOutlineDotsVertical, HiPlus, HiSearch } from "react-icons/hi";

export default function Table1() {
    const [selectedItem, setSelectedItem] = useState({})
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onOpenChange: onOpenChange3 } = useDisclosure();
    const [filterValue, setFilterValue] = useState("");
    const [filterLists, setFilterLists] = useState(lists);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setFilterLists(lists.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
        } else {
            setFilterValue("");
            setFilterLists(lists);
        }
    }, [])

    const ModalForReqItem = () => {
        const [formValue, setFormValue] = useState({ name: '', description: '', available: '', damaged: '' })

        const handleChange = (e) => {
            setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }))
        }

        const handleSubmit = (e, onClose) => {
            e.preventDefault()
            alert(JSON.stringify(formValue, null, 2))
            setFormValue({ name: '', description: '', available: '', damaged: '' })
            onClose()
        }

        return (
            <>
                <Modal
                    isOpen={isOpen3}
                    placement="center"
                    onOpenChange={() => {
                        onOpenChange3()
                    }}
                    className="h-auto"
                    backdrop="blur"
                >
                    <ModalContent>
                        {
                            (onClose) => (
                                <>
                                    <div className="title mt-6">Request new Item</div>
                                    <form
                                        className="space-y-3 mt-4"
                                        onSubmit={(e) => handleSubmit(e, onClose)}
                                    >
                                        {/*  */}
                                        {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4"> */}
                                        <Autocomplete
                                            // isRequired
                                            label="Name"
                                            value={formValue.name}
                                            onInputChange={(val) => setFormValue(prev=>({...prev, name:val}))}
                                            placeholder="Search an item"
                                            defaultItems={animals}
                                            labelPlacement="outside"
                                            className="border-none outline-none"
                                        >
                                            {(animal) => (
                                                <AutocompleteItem key={animal.value} value={animal.value}>
                                                    {animal.value}
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>
                                        {/* </div> */}
                                        {/*  */}
                                        <div>
                                            <label htmlFor="description">Description</label>
                                            <input
                                                id="description"
                                                name="description"
                                                type="text"
                                                placeholder="Description of the item"
                                                required
                                                value={formValue.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="available">Available</label>
                                            <input
                                                id="available"
                                                name="available"
                                                type="text"
                                                placeholder="Amount of available items"
                                                required
                                                value={formValue.available}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email">Damaged</label>
                                            <input
                                                id="damaged"
                                                name="damaged"
                                                type="text"
                                                placeholder="Amount of damaged items"
                                                required
                                                value={formValue.damaged}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-x-4">
                                            <Button type="submit" color="primary">Submit</Button>
                                            <Button className="bg-red-600 text-white" onPress={onClose}>Close</Button>
                                        </div>
                                    </form>
                                </>
                            )
                        }
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const ModalForNewItem = () => {
        const [formValue, setFormValue] = useState({ name: '', description: '', available: '', damaged: '' })

        const handleChange = (e) => {
            setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }))
        }

        const handleSubmit = (e, onClose) => {
            e.preventDefault()
            setFilterLists((prev) => [...prev, formValue])
            setFormValue({ name: '', description: '', available: '', damaged: '' })
            onClose()
        }

        return (
            <>
                <Modal
                    isOpen={isOpen2}
                    placement="center"
                    onOpenChange={() => {
                        onOpenChange2()
                    }}
                    className="h-auto"
                    backdrop="blur"
                >
                    <ModalContent>
                        {
                            (onClose) => (
                                <>
                                    <div className="title mt-6">Add new Item</div>
                                    <form
                                        className="space-y-3 mt-4"
                                        onSubmit={(e) => handleSubmit(e, onClose)}
                                    >
                                        <div>
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Name of the item"
                                                required
                                                value={formValue.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description">Description</label>
                                            <input
                                                id="description"
                                                name="description"
                                                type="text"
                                                placeholder="Description of the item"
                                                required
                                                value={formValue.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="available">Available</label>
                                            <input
                                                id="available"
                                                name="available"
                                                type="text"
                                                placeholder="Amount of available items"
                                                required
                                                value={formValue.available}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email">Damaged</label>
                                            <input
                                                id="damaged"
                                                name="damaged"
                                                type="text"
                                                placeholder="Amount of damaged items"
                                                required
                                                value={formValue.damaged}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="space-x-4">
                                            <Button type="submit" color="primary">Submit</Button>
                                            <Button className="bg-red-600 text-white" onPress={onClose}>Close</Button>
                                        </div>
                                    </form>
                                </>
                            )
                        }
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const ModalForAction = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, damaged: selectedItem.damaged, req_item: null })

        const handleChange = (e) => {
            setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }))
        }

        const handleSubmit = (e, onClose) => {
            e.preventDefault()
            alert(JSON.stringify(formValue, null, 2))
            setFormValue({ name: '', description: '', available: '', damaged: '', req_item: null })
            onClose()
        }

        return (
            <>
                <Modal
                    isOpen={isOpen}
                    placement="center"
                    onOpenChange={() => {
                        console.log(selectedItem)
                        setSelectedItem({})
                        onOpenChange()
                    }}
                    className="h-auto"
                    backdrop="blur"
                >
                    <ModalContent>
                        {
                            (onClose) => (
                                <>
                                    <div className="title mt-6">{selectedItem?.title}</div>
                                    <form className="space-y-3 mt-4" onSubmit={(e) => handleSubmit(e, onClose)}>
                                        <div>
                                            <label htmlFor="name">Name</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Name of the item"
                                                readOnly
                                                value={formValue.name}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description">Description</label>
                                            <input
                                                id="description"
                                                name="description"
                                                type="text"
                                                placeholder="Description of the item"
                                                readOnly
                                                value={formValue.description}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="available">Avaiable</label>
                                            <input
                                                id="available"
                                                name="available"
                                                type="text"
                                                placeholder="Amount of available items"
                                                readOnly
                                                value={formValue.available}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="damaged">Damaged</label>
                                            <input
                                                id="damaged"
                                                name="damaged"
                                                readOnly
                                                value={formValue.damaged}
                                                type="text"
                                                placeholder="Amount of damaged items"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="req_amount">Amount</label>
                                            <input
                                                id="req_amount"
                                                name="req_amount"
                                                type="text"
                                                placeholder="Amount of Request items"
                                                value={formValue.req_item}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-x-4">
                                            <Button color="primary" type="submit">Submit</Button>
                                            <Button className="bg-red-600 text-white" onPress={onClose}>Close</Button>
                                        </div>
                                    </form>
                                </>
                            )
                        }
                    </ModalContent>
                </Modal>
            </>
        )
    }


    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 md:flex-row flex-col items-center">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full md:max-w-[44%]",
                        }}
                        placeholder="Search by name..."
                        size=""
                        radius='none'
                        startContent={<HiSearch className="text-default-300" />}
                        value={filterValue}
                        variant="bordered"
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />
                    <div className='space-x-2'>
                        <Button color="primary" size="sm" onPress={onOpen3}>
                            Request for newItem
                        </Button>
                        <Button size="sm" onPress={onOpen2}>
                            Add new Item
                        </Button>
                    </div>
                </div>
                <div className="flex">
                    <span className="text-default-400 text-small">Total {filterLists.length} items</span>
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        filterLists,
    ]);

    return (
        <div className="space-y-2">

            <div className="rounded-md overflow-x-auto max-w-full border border-blight-1">
                <Table
                    topContent={topContent}
                    radius="none"
                    aria-label="Table"
                    className="w-full overflow-hidden rounded-md"
                >
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn>Available</TableColumn>
                        <TableColumn>Damaged</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            filterLists.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.available}</TableCell>
                                    <TableCell>{item.damaged}</TableCell>
                                    <TableCell>
                                        <Dropdown className="rounded-md">
                                            <DropdownTrigger>
                                                <Button isIconOnly variant="none" className='rounded-full'>
                                                    <HiOutlineDotsVertical />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                {/* Requrest to Headsir */}
                                                <DropdownItem
                                                    onPress={() => {
                                                        onOpen()
                                                        setSelectedItem({ ...item, title: "Request for Restock", id: 1 })
                                                    }}
                                                    className="rounded-md"
                                                >
                                                    Request For Restock
                                                </DropdownItem>
                                                <DropdownItem
                                                    onPress={() => {
                                                        onOpen()
                                                        setSelectedItem({ ...item, title: "Request for Repair", id: 2 })
                                                    }}
                                                    className="rounded-md"
                                                >
                                                    Request For Repair
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                <ModalForAction />
                <ModalForNewItem />
                <ModalForReqItem />
            </div>
        </div>
    );
}


const lists = [
    {
        name: 'PC',
        description: 'This is a very long text that describes the item.',
        available: 12,
        damaged: 3,
    },
    {
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
