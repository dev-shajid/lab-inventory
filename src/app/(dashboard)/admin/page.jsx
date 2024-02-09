'use client'

import { useEffect, useState } from "react";
import HandleNewUserRequest from "./HandleNewUserRequest";
import HandleUserRequest from "./HandleUserRequest";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUserContext } from "@/context/ContextProvider";

export default async function Admin() {
  const { refetchUserTable1, refetchUserTable2 } = useUserContext()
  const [isLoading, setIsLoading] = useState(true)
  const [newUsers, setNewUsers] = useState([])
  const [users, setUsers] = useState([])

  const getUsers = () => {
    setIsLoading(true)
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data)
      })
      .finally(() => setIsLoading(false))
  }

  const getNewUserRequest = () => {
    setIsLoading(true)
    fetch('/api/user/newUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        setNewUsers(data)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
      getNewUserRequest()
  }, [refetchUserTable1])

  useEffect(() => {
      getUsers()
  }, [refetchUserTable2])

  return (
    <>
      {

        isLoading ?
          <section className='container py-16 h-screen gap-3 flex justify-center items-center'>
            <AiOutlineLoading3Quarters size={28} className='animate-spin' />
            <p className='text-base'>Loading...</p>
          </section> :
          (
            <section className="container space-y-8">
              <HandleNewUserRequest users={newUsers} getNewUserRequest={getNewUserRequest} />
              <HandleUserRequest users={users} getUsers={getUsers} />
            </section>

          )
      }
    </>
  );
}