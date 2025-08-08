"use client"
import React, { useEffect } from 'react'
import { useTheme } from "next-themes"

function Dashboard() {

  const { setTheme } = useTheme()

  useEffect(()=>{
    // setTheme("dark")
    setTheme("light")
    // setTheme("system")
  },[])
  return (
    <div>
      <div className='p-7'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
      </div>
    </div>
  )
}

export default Dashboard
