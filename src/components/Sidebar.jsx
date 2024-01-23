'use client'

import { Avatar, Button, Divider } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { RxCross1, RxDashboard } from 'react-icons/rx'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { IoIosLogOut } from 'react-icons/io'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const user = { userName: "Lab Assistant" }
    const pathname = usePathname()
    return (
        <>
            <div
                onClick={() => {
                    document.querySelector('.main_sidebar')?.classList.add('active_sidebar')
                }}
                className='h-[40px] w-[40px] border flex justify-center items-center cursor-pointer border-gray-400 rounded-full text-black md:hidden m-6 mb-0'
            >
                <AiOutlineMenuUnfold className='text-2xl' />
            </div>
            <aside className='main_sidebar h-screen flex flex-col bg-gray-100 border-r border-gray-300 min-w-[250px] p-4 md:sticky fixed top-0 bottom-0 md:left-0 left-[-40%] duration-300 transition-all z-10'>
                <div className='flex items-center space-x-2 justify-between mb-8'>
                    <Link href='/' className="bg-black select-none rounded-sm px-3 py-2 text-2xl font-semibold text-white">LAB</Link>
                    <div
                        onClick={() => {
                            document.querySelector('.main_sidebar')?.classList.remove('active_sidebar')
                        }}
                        className='h-[40px] w-[40px] border flex justify-center items-center cursor-pointer border-gray-400 rounded-full text-black md:hidden'
                    >
                        <RxCross1 />
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                    <div className="sidebar-menu space-y-1">
                        {
                            MenuItems.map((item, i) => (
                                <Link key={i} href={item.link} className={`flex items-center text px-3 py-2 rounded-md space-x-3 transition-all 
                                ${'/' + pathname.split('/')[1] == item.link ? 'bg-gray-300' : 'lg:hover:bg-gray-200'}
                            `}>
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                    <div className='flex justify-between items-center space-x-2'>
                        <Link href='/' className={`flex flex-1 items-center rounded-md space-x-1 transition-all `}>
                            <Avatar className='rounded-full border border-gray-300' src={0 ? '' : "/images/avatar.jpg"}></Avatar>
                            <span className='text'>{user?.userName && user?.userName}</span>
                        </Link>
                        <Button
                            isIconOnly
                            variant='none'
                            className='text-xl text-black'
                        >
                            <IoIosLogOut />
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    )
}

const MenuItems = [
    {
        name: 'Dashboard',
        icon: <RxDashboard />,
        link: '/'
    },
    {
        name: 'Lab 1',
        icon: <RxDashboard />,
        link: '/lab1'
    },
    {
        name: 'Lab 2',
        icon: <RxDashboard />,
        link: '/lab2'
    },
    {
        name: 'Lab 3',
        icon: <RxDashboard />,
        link: '/lab3'
    },
]