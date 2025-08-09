import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react'

function StatusList({attendanceList}) {

    const [totalStudent,setTotalStudent] = useState(0)
    const [presentPercentage,setPresentPercentage] = useState(0)

    useEffect(()=>{
        if(attendanceList){
            const totalStuds =  getUniqueRecord(attendanceList)
            setTotalStudent(totalStuds)
            setTotalStudent(totalStuds.length); // store number, not array

            const today = moment().format('D');
            const presentPerc = (attendanceList.length / (totalStuds.length * Number(today)) * 100);
            setPresentPercentage(presentPerc);
            
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
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
      <Card icon={<GraduationCap/>} title="Total Student" value={totalStudent}/>
      <Card icon={<TrendingUp/>} title="Total % Present" value={presentPercentage.toFixed(1)+'%'}/>
      <Card icon={<TrendingDown/>} title="Total % Absent" value={(100 - presentPercentage).toFixed(1)+'%'}/>
    </div>
  )
}

export default StatusList
