'use client'

import HandleNewUserRequest from "./HandleNewUserRequest";
import HandleUserRequest from "./HandleUserRequest";
import Loading from "@/components/Loading";
import useApi from "@/lib/useApi";

export default function Admin() {
  const {getNewUsers, getUsers} = useApi()

  if (getNewUsers.isLoading || getUsers.isLoading) return <Loading page />
  return (
    <>
      <section className="container space-y-8">
        <HandleNewUserRequest users={getNewUsers.data} />
        <HandleUserRequest users={getUsers.data} />
      </section>
    </>
  );
}