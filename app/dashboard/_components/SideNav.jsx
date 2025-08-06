"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function SideNav() {

  const {user} = useKindeBrowserClient();
  const menuList = [
    {
      id:1,
      name : 'Dashboard',
      icon:LayoutIcon,
      path:'/dashboard'
    },
    {
      id:2,
      name : 'Students',
      icon:GraduationCap,
      path:'/dashboard/students'
    },
    {
      id:3,
      name : 'Attendance',
      icon:Hand,
      path:'/dashboard/Attendance'
    },
    {
      id:4,
      name : 'Settings',
      icon:Settings,
      path:'/dashboard/settings'
    },

  ]
  return (
    <div className='border shadow:md h-screen'>
      <Image src={'/logo.svg'} width={30} height={30} alt='logo'/>

      <hr className='my-5' />

      {menuList.map((menu,index)=>(
        <div  key={index}>
          <Link href={menu.path}>
          <h2
            className='flex items-center gap-3 text-md p-4
            text-slate-800 hover:bg-primary hover:text-white hover:border-4
              cursor-pointer rounded-lg'>

            <menu.icon />
            {menu.name}
          </h2>
          </Link>
        </div>
      ))}

      <div className='flex gap-2 items-center bottom-5 fixed p-2'>
        {user?.picture ? (
          <Image src={user.picture} width={35} height={35} alt='user'
            className='rounded-full'/>) : null}
        <div>
          <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
          <h2 className='text-xs text-slate-500'>{user?.email}</h2>
        </div>
      </div>
    </div>
  )
}

export default SideNav
