import React from 'react'

function Hero({children}) {
  return (
    <div className='bg-gray-100 flex flex-col items-center h-28 text-center'>
        <p className=' text-2xl font-bold mx-auto flex flex-col p-4'>{children}</p>
    </div>
  )
}

export default Hero