import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({isAuthenticated, children}) => {

    if(!isAuthenticated){
        return <Navigate to={'/login'}/>
    }
  return children
  
}
