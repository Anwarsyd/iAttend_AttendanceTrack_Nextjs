import moment from 'moment'
import React, { useEffect, useState } from 'react'

function StatusList({attendanceList}) {

    const [totalStudent,setTotalStudent] = useState(0)
    const [presentPercentage,setPresentPercentage] = useState(0)

    useEffect(()=>{
        if(attendanceList){
            const totalStuds =  getUniqueRecord(attendanceList)
            setTotalStudent(totalStuds)
            console.log(totalStuds);
            

            const today = moment().format('D')
            const presentPerc = (attendanceList.length/(totalStuds.length*Number(today))*100) 
            console.log(presentPerc);
            
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
    <div>
      <h2>Status List</h2>
    </div>
  )
}

export default StatusList
