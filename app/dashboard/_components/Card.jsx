import React from 'react'

function Card({icon,title,value}) {
  return (
    <div className='p-2 flex  items-center gap-5 rounded-lg shadow-sm bg-sky-100'>
      <div className='p-2 h-10 w-10 rounded-full bg-white text-primary '>
        {icon}
      </div>
      <div>
        <h2 className='font-bold'>{title}</h2>
        <h2 className='text-lg'>{value}</h2>
      </div>
    </div>
  )
}

export default Card
