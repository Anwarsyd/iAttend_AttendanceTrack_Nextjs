"use client"
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

function Attendance() {

  const[selectedMonth,setSelectedMonth] = useState()
  const[selectedGrade,setSelectedGrade] = useState()
  const[attendanceList,setAttendanceList] = useState()

  // used for fetch attendance list for give month and grade
  const onSearchHandler=()=>{ 
    // console.log(selectedMonth,selectedGrade);
    const month=moment(selectedMonth).format('MM/YYYY')
    console.log(month);
    
    GlobalApi.GetAttendanceList(selectedGrade,month).then(resp=>{
      setAttendanceList(resp.data);
      // console.log(resp.data)
      
    })
    
  }

  return (
    <div className='p-7'>
      <h2 className='text-2xl font-bold'>Attendance</h2>

      {/* Search option */}
      
      <div className='flex gap-5 my-5 p-3 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)}/>
        </div>

        <div  className='flex gap-2 items-center'>
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(value)=>setSelectedGrade(value)}/>
        </div>
        <Button onClick={()=>onSearchHandler()} className='mt-2 ml-1'>Search</Button>
      </div>


      {/* Select Attendance Grid */}
      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth}/>
    </div>
  )
}

export default Attendance