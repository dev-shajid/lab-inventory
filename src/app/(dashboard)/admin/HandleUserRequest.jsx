'use client'

import { ActionIcon, Menu } from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ImCross } from "react-icons/im";

export default function HandleNewUserRequest() {

    return (
        <div className="space-y-2">
            <div className="title">Users</div>
            <div className="event_table overflow-x-auto max-w-fulls mx-auto rounded-md border border-blight-1">
                <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                        <tr>
                            <th>SL NO.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lists.map((item, i) => (
                                <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.role}</td>
                                    <td className="space-x-3 min-w-[110px]">
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
                                                            // openActionModal()
                                                            // setSelectedItem({ ...item, title: "Edit", id: 3 })
                                                        }}
                                                    >
                                                        Lab Manager
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        onClick={() => {
                                                            // openActionModal()
                                                            // setSelectedItem({ ...item, title: "Edit", id: 3 })
                                                        }}
                                                    >
                                                        Lab Asistant
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Item
                                                        color="red"
                                                        onClick={() => {
                                                            alert("Item delted!")
                                                        }}
                                                    >
                                                        Delete User
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
        </div>
    );
}


const lists = [
    {
        name: "Md. Aminul Islam Khadem",
        email: "khadem1986@gmail.com",
        phone: "01878715150",
        role: 'Lab Manager',
    },
    {
        name: "Md. Aminul Islam Khadem",
        email: "khadem1986@gmail.com",
        phone: "01878715150",
        role: 'Lab Asistant',
    },
    {
        name: "Md. Aminul Islam Khadem",
        email: "khadem1986@gmail.com",
        phone: "01878715150",
        role: 'Lab Asistant',
    },
]
