'use client'

import React, { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure, Modal, ModalContent, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { HiOutlineDotsVertical, HiPlus, HiSearch } from "react-icons/hi";

export default function EventTable() {

    return (
        <div className="space-y-2">

            <div className="event_table max-w-[1000px] overflow-x-auto max-w-fulls mx-auto rounded-md border border-blight-1">
                <table className="w-full min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Demand</th>
                            <th>Provide</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lists.map((item, i) => (
                                <tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.demand}</td>
                                    <td>{item.provide}</td>
                                    <td>
                                        <p className={`chip ${item.status}`}>
                                            {
                                                item.status == 'a' ?
                                                    'Accepted' :
                                                    item.status == 'p' ?
                                                        'Pending' :
                                                        'Rejected'
                                            }
                                        </p>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}


const lists = [
    {
        name: 'PC',
        description: 'This is a very long text that describes the item.',
        demand: 5,
        provide: 5,
        status: 'a',
    },
    {
        name: 'UPS',
        description: 'This is a very long text that describes the item.',
        demand: 6,
        provide: 6,
        status: 'r',
    },
    {
        name: 'Monitor',
        description: 'This is a very long text that describes the item.',
        demand: 3,
        provide: 3,
        status: 'p',
    },
]
