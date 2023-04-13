import { gql, useQuery } from '@apollo/client'
import React from 'react'


const RETRIEVE_USERS = gql`
query MyQuery2 {
    users {
      create_at
      name
    }
  }
`
export const Users = () => {
    const {loading, error, data} = useQuery(RETRIEVE_USERS);
  return (
    <>
    <div>Users Page</div>
    {loading && <div>loading......</div>}
    {data?.users.map((user,idx) => {
        return <p key={idx}>{user.name}</p>
    })}
    </>
  )
}
