import React from 'react'

function Card({icon,title,value}) {
  return (
    <div>
      <div>
        {icon}
      </div>
      <div>
        <h2>{title}</h2>
        <h2>{value}</h2>
      </div>
    </div>
  )
}

export default Card
