import React from 'react'

function ButtonHero({children}) {
  return (
        <button className='text-sm bg-purple-400 p-2 rounded hover:bg-purple-600 duration-500 text-white m-4'>{children}</button>
  )
}

export default ButtonHero