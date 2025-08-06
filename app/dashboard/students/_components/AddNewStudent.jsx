"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";

import { Input } from '@/components/ui/input'
import GlobalApi from '@/app/_services/GlobalApi';
import { Item } from '@radix-ui/react-select';

function AddNewStudent() {
    const [open,setOpen] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [grades,setgrades]= useState([])

    useEffect(()=>{
        getAllGrades()
    },[])
    const getAllGrades =()=>{
        GlobalApi.GetAllGrades().then(resp=>{
            // console.log(resp.data);
            setgrades(resp.data)
            
        })
    }

    const onSubmit =(data)=>{
        console.log("FormData",data);
        GlobalApi.CreateNewStudent(data).then(resp=>{
            console.log('--',resp);
            
        })
        
    }

  return (
    <div>
      <Button onClick={()=>setOpen(true)}>+Add New Button</Button>
      <Dialog open={open}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                    Please fill in the student details below.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-1'>
                    <label>Full Name</label>
                    <Input placeholder="Enter Your Full Name" {...register('name',{required:true})}/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Select Grade</label>
                    {/* <select className='p-3 border rounded-lg' {...register('grade',{required:true})}>
                        <option value={"5th"}>5 th</option>
                        <option value={"6th"}>6 th</option>
                        <option value={"7th"}>7 th</option>
                    </select> */}

                    <select className='p-3 border rounded-lg' {...register('grade',{required:true})}>
                        {grades.map((value,index)=>(
                            <option key={index} value={Item.grade}>{value.grade}</option>
                        ))}
                    </select>
                </div>
                <div className='py-1'>
                    <label>Contact Number</label>
                    <Input type='number' placeholder="Enter Your Contact Number" {...register('contact',{required:true})}/>
                </div>
                <div className='py-1'>
                    <label>Address</label>
                    <Input placeholder="Enter Your Address"{...register('address')}/>
                </div>

                <div className='flex items-center justify-end mt-5 gap-3'>
                    <Button onClick={()=>setOpen(false)} variant='ghost'>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddNewStudent
