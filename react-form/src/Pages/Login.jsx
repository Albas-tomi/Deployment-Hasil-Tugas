import React from 'react'
import LoginBody from '../components/Login/LoginBody'
import Banner from '../assets/Login.png';

function Login() {
  return (
    <div>
      <div className="flex">
        <div className="flex  flex-col m-auto sm:mt-[-80px] ">
          <LoginBody />
        </div>
        <div className="hidden  w-1/2 lg:block sm:mt-[-80px] p-14">
          <img src={Banner} alt="Banner" />
        </div>
      </div>
    </div>
  )
}

export default Login