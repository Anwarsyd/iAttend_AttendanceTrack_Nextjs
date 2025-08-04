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
      <div>Page</div>
    </div>
  )
}

export default Dashboard
