'use client'

import { ActionIcon } from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function HandleNewUserRequest() {

    return (
        <div className="space-y-2">
            <div className="title">New Entry</div>
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
                                    <td>User</td>
                                    <td className="space-x-3 min-w-[110px]">
                                        <ActionIcon
                                            variant="light"
                                            color="indigo"
                                            size="sm"
                                        >
                                            <FaCheck size={14} />
                                        </ActionIcon>
                                        <ActionIcon
                                            variant="light"
                                            color="red"
                                            size="sm"
                                        >
                                            <ImCross size={12} />
                                        </ActionIcon>
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
    },
    {
        name: "Md. Aminul Islam Khadem",
        email: "khadem1986@gmail.com",
        phone: "01878715150",
    },
    {
        name: "Md. Aminul Islam Khadem",
        email: "khadem1986@gmail.com",
        phone: "01878715150",
    },
]
