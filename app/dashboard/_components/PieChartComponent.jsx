import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function PieChartComponent({attendanceList}) {

    const [data,setData] = useState([])

    useEffect(()=>{
            if(attendanceList){
                const totalStuds =  getUniqueRecord(attendanceList)
    
                const today = moment().format('D');
                const presentCount = attendanceList.filter(a => a.present === true).length;
                const totalPossible = totalStuds.length * Number(today);
                const presentPerc = (presentCount / totalPossible) * 100;

                setData([
                    {
                        name:'Total Present',
                        value :Number(presentPerc.toFixed(1)),
                        fill:"#8884d8"
                    },
                    {
                        name:'Total Absent',
                        value:Number(100-presentPerc.toFixed(1)),
                        fill:"#82ca9d"
                    }
                ])
                
                
            }
        },[attendanceList])
    
    
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
    <div className='border p-1 rounded-lg'>
        <h2 className='font-bold text-lg'>Montly Attendance</h2>
        <ResponsiveContainer width={'100%'} height={300}>
                <PieChart >
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PieChartComponent
