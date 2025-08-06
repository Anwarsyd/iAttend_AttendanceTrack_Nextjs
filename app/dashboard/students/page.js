"use client"
import React, { useEffect, useState } from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentListTable from './_components/StudentListTable'

function Student() {

  const[studentList,setStudentList]=useState([])

  useEffect(()=>{
    GetAllStudents();
  },[])

  // used to get All Students
  const GetAllStudents=()=>{
    GlobalApi.GetAllStudents().then(resp=>{
      // console.log(resp.data);
      setStudentList(resp.data)
      
    })
  }
  return (
    <div className='p-7'>
      <h1 className='font-bold text-2xl flex justify-between items-center'>Studets Details <AddNewStudent /></h1>
      
      <StudentListTable studentList={studentList} />
    </div>
  )
}

export default Student
