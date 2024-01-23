'use client'

import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure, Modal, ModalContent, Input } from "@nextui-org/react";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Table1() {
    const [selectedItem, setSelectedItem] = useState({})
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="overflow-x-auto max-w-full">
            <Table radius="sm" className="w-full min-w-[400px]">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn>Available</TableColumn>
                    <TableColumn>Damaged</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        list.map((item, i) => (
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
                                                    setSelectedItem({...item, title: "Request for Item"})
                                                }}
                                                className="rounded-md"
                                            >
                                                Request For Item
                                            </DropdownItem>
                                            <DropdownItem
                                                onPress={() => {
                                                    onOpen()
                                                    setSelectedItem({...item, title: "Request for Repair"})
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

            <>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={() => {
                        console.log(selectedItem)
                        setSelectedItem({})
                        onOpenChange()
                    }}
                    className="h-auto pt-12"
                    backdrop="blur"
                >
                    <ModalContent>
                        {
                            (onClose) => (
                                <>
                                    <div className="title">{selectedItem?.title}</div>
                                    <form className="space-y-8 mt-4">
                                        <Input isReadOnly size="md" type="text" className="border border-gray-300 rounded-[8px]" radius="sm" label="Name" value={selectedItem?.name} />
                                        <Input size="md" type="text" className="border border-gray-300 rounded-[8px]" radius="sm" label="Description" placeholder="Write some description" />
                                        <Input isReadOnly size="md" type="text" className="border border-gray-300 rounded-[8px]" radius="sm" label="Available" value={selectedItem?.available} />
                                        <Input isReadOnly size="md" type="text" className="border border-gray-300 rounded-[8px]" radius="sm" label="Damaged" value={selectedItem?.damaged} />
                                        <div className="space-x-4">
                                            <Button color="primary" onPress={onClose}>Submit</Button>
                                            <Button className="bg-red-600 text-white" onPress={onClose}>Close</Button>
                                        </div>
                                    </form>
                                </>
                            )
                        }
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
}


const list = [
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