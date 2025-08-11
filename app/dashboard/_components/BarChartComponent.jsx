import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartComponent({attendanceList,totalPresentData}) {
    const [data,setData] = useState([])

    useEffect(()=>{
        formatAttendanceListCount()
    },[attendanceList||totalPresentData])

    // useEffect(()=>{
    //     formatAttendanceListCount()
    // },[totalPresentData])
    const formatAttendanceListCount=()=>{
        const totalStudent = getUniqueRecord(attendanceList);
        const result = totalPresentData?.map((item=>({
            day: item.day,
            presentCount: item.presetCount,
            absentCount: Number(totalStudent?.length) - Number(item.presetCount)

        })))

        console.log(result);
        setData(result)
    }

    const getUniqueRecord=()=>{
        const uniqueRecord=[];
        const existingUser=new Set();

        attendanceList?.forEach(record => {
            if(!existingUser.has(record.studentId)){
                existingUser.add(record.studentId);
                uniqueRecord.push(record)
            }
        });
        return uniqueRecord
    }
  return (
    <div className='p-5 border rounded-lg shadow-sm'>
        <h2 className='my-2 font-bold text-lg'>Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="presentCount" name="Total Present" fill="#8884d8" />
                <Bar dataKey="absentCount" name="Total Absent" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponent
