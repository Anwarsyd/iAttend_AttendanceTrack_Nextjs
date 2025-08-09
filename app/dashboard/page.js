"use client"
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import MonthSelection from '../_components/MonthSelection'
import GradeSelect from '../_components/GradeSelect'
import GlobalApi from '../_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'
import BarChartComponent from './_components/BarChartComponent'

function Dashboard() {

  const { setTheme } = useTheme()

  const [selectedMonth,setSelectedMonth] = useState();
  const [selectedGrade,setSelectedGrade] = useState();

  const [attendanceList,setAttendanceList] = useState()
  const [totalPresentData,setTotalPresentData] = useState();


  useEffect(()=>{
    // setTheme("dark")
    // setTheme("light")
    // setTheme("system")
    getTotalPresentCountByDay();
    getStudentAttendance()
    
  },[selectedMonth||selectedGrade])


  //used to get student Attendanve for given month and Date
  const getStudentAttendance=()=>{
      GlobalApi.GetAttendanceList(selectedGrade,moment(selectedMonth).format('MM/yyyy')).then(resp=>{
        setAttendanceList(resp.data);
        
      })
  }

  //get the total present on each day
  const getTotalPresentCountByDay=()=>{
  GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'),selectedGrade).then(resp=>{
    setTotalPresentData(resp.data);
  })
}

  return (
    <div>
      <div className='p-7'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex justify-center items-center gap-4'>
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
        </div>

        <StatusList attendanceList={attendanceList} />

        <div className='grid grid-cols-1 md:grid-cols-3'>
          <div className='md:col-span-2'>
            <BarChartComponent attendanceList={attendanceList} totalPresentData={totalPresentData} />
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
