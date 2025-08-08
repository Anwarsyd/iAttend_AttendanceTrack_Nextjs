import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi'

function GradeSelect({selectedGrade}) {

  const [grades,setgrades]= useState([])

  useEffect(()=>{
      getAllGradesList()
  },[])

  const getAllGradesList =()=>{
      GlobalApi.GetAllGrades().then(resp=>{
          setgrades(resp.data)
          
      })
  }
  return (
    <div>
      <div>
          <select className='p-2 border rounded-lg' onChange={(event)=>selectedGrade(event.target.value)}>
              {grades.map((value,index)=>(
                  <option key={index} value={value.grade}>{value.grade}</option>
              ))}
          </select>
      </div>
    </div>
  )
}

export default GradeSelect
