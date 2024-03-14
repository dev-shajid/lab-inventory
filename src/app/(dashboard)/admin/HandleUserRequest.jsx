'use client'

import { useUserContext } from "@/context/ContextProvider";
import { ActionIcon, Menu } from "@mantine/core";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useApi from "@/lib/useApi";


export default function HandleNewUserRequest({ users, setUsers }) {
    const { dispatch, user } = useUserContext()
    const { deleteUser, roleLabManager, roleLabAsistant } = useApi()
    const router = useRouter()


    if (!user || !user?.role) router.push('/signin')
    if (user?.role != 'admin') router.push('/')
    return (
        <>
            {
                users.length ?
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
                                        users.map((item, i) => (
                                            <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                                <td>{i + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td className="flex flex-col gap-1">
                                                    <span className="capitalize">{item?.role}</span>
                                                    {item?.lab && <span className="">{`(${item?.lab[0].toUpperCase()}${item?.lab.slice(1)} Lab)`}</span>}
                                                </td>
                                                <td className="space-x-3 min-w-[110px]">
                                                    <>
                                                        <Menu width={200} shadow="md">
                                                            <Menu.Target>
                                                                <ActionIcon
                                                                    variant="transparent"
                                                                    size='sm'
                                                                    color="#000"
                                                                    disabled={item.role == 'admin'}
                                                                >
                                                                    <HiOutlineDotsVertical size={16} />
                                                                </ActionIcon>
                                                            </Menu.Target>

                                                            <Menu.Dropdown>
                                                                {
                                                                    ['os', 'computer', 'microprocessor'].map((lab, i) => (
                                                                        <Menu.Item
                                                                            key={i}
                                                                            onClick={() => {
                                                                                let loadingPromise = toast.loading("Loading...")
                                                                                roleLabAsistant.mutate({ id: item.id, lab }, {
                                                                                    onSuccess: () => {
                                                                                        toast.success("Role set Successfully!", { id: loadingPromise })
                                                                                    },
                                                                                    onError: (e) => {
                                                                                        console.log(e)
                                                                                        toast.error(e?.message || "Something is wrong!", { id: loadingPromise })
                                                                                    },
                                                                                })
                                                                            }}
                                                                        >
                                                                            Lab Asistant ({lab})
                                                                        </Menu.Item>
                                                                    ))
                                                                }
                                                                <Menu.Item
                                                                    onClick={() => {
                                                                        let loadingPromise = toast.loading("Loading...")
                                                                        roleLabManager.mutate({ id: item.id }, {
                                                                            onSuccess: () => {
                                                                                toast.success("Role set Successfully!", { id: loadingPromise })
                                                                            },
                                                                            onError: (e) => {
                                                                                console.log(e)
                                                                                toast.error(e?.message || "Something is wrong!", { id: loadingPromise })
                                                                            },
                                                                        })
                                                                    }}
                                                                >
                                                                    Lab Manager
                                                                </Menu.Item>
                                                                <Menu.Divider />
                                                                <Menu.Item
                                                                    color="red"
                                                                    onClick={() => {
                                                                        let loadingPromise = toast.loading("Loading...")
                                                                        deleteUser.mutate({ id: item.id }, {
                                                                            onSuccess: () => {
                                                                                toast.success("Deleted Successfully!", { id: loadingPromise })
                                                                            },
                                                                            onError: (e) => {
                                                                                console.log(e)
                                                                                toast.error(e?.message || "Something is wrong!", { id: loadingPromise })
                                                                            },
                                                                        })
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
                    </div >
                    : <></>
            }
        </>
    );
}