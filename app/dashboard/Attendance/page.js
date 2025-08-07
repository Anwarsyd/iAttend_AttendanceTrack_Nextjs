import MonthSelection from '@/app/_components/MonthSelection'
import React from 'react'

function Attendance() {
  return (
    <div className='p-7'>
      <h1 className='text-2xl font-bold'>Attendance</h1>

      {/* Search option */}

      <MonthSelection />
      {/* Select Attendance Grid */}
    </div>
  )
}

export default Attendance
