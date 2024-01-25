'use client'

import React, { useCallback, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, useDisclosure, Modal, ModalContent, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { HiOutlineDotsVertical, HiPlus, HiSearch } from "react-icons/hi";

export default function EventTable() {

    return (
        <div className="space-y-2">

            <div className="event_table max-w-[1000px] overflow-x-auto max-w-fulls mx-auto rounded-md border border-blight-1">
                <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                        <tr>
                            <th>SL NO.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Demand</th>
                            <th>Supply</th>
                            <th>Name of Lab</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lists.map((item, i) => (
                                <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                    <td>{i+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.demand}</td>
                                    <td>{item.supply}</td>
                                    <td>{item.lab}</td>
                                    <td>{item.date}</td>
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
        supply: 5,
        status: 'a',
        lab: 'OS Lab',
        date: new Date(1703323232323).toLocaleString(),
    },
    {
        name: 'UPS',
        description: 'This is a very long text that describes the item.',
        demand: 6,
        supply: 6,
        status: 'r',
        lab: 'OS Lab',
        date: new Date(1703323232323).toLocaleString(),
    },
    {
        name: 'Monitor',
        description: 'This is a very long text that describes the item.',
        demand: 3,
        supply: 3,
        status: 'p',
        lab: 'OS Lab',
        date: new Date(1703323232323).toLocaleString(),
    },
]
