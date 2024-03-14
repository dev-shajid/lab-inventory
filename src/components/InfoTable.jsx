'use client'

import useApi from '@/lib/useApi'

export default function InfoTable({ role, lab = '' }) {

    const { getUser } = useApi()

    let { data: userDetails } = getUser({ role, lab })

    if (!userDetails?.name) return <></>
    return (
        <div className=''>
            <div className='title'>Info</div>
            <div className='info_table overflow-x-auto'>
                <table className="text-sm max-w-[400px] overflow-hidden text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        <tr>
                            <th>Fullname</th>
                            <td>{userDetails?.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{userDetails?.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{userDetails?.phone}</td>
                        </tr>
                        <tr>
                            <th>Designation</th>
                            <td className="flex flex-col gap-1">
                                <span className="capitalize">{userDetails?.role}</span>
                                {userDetails?.lab && <span className="">{`(${userDetails?.lab[0].toUpperCase()}${userDetails?.lab.slice(1)} Lab)`}</span>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
