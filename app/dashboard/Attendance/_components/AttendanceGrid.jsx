import React, { useEffect, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';


function AttendenceGrid({attendanceList,selectedMonth}) {

    const [rowData,setRowData]=useState()
    const [colDefs,setColDefs]=useState([
        { field : 'studentId'},
        { field : 'name'},
    ])

    //days in month
    const daysInMonth=(year,month)=>new Date(year,month+1,0).getDate()
    const numberOfDays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
    console.log(numberOfDays)

    //days of array
    const daysArray=Array.from({length:numberOfDays},(_,i)=>i+1)
    // console.log(daysArray);

    useEffect(()=>{
        if(attendanceList){
            const userList=getUniqueRecord()
            // console.log(userList)
            setRowData(userList)

            daysArray.forEach((date)=>{
                setColDefs(prevData=>[...prevData,{
                    field : date.toString(),width:50,editable:true
                }])

                userList.forEach(obj=>{
                    // obj[date]=false
                    obj[date]=isPresent(obj.studentId,date)
                })

            })
        }

    },[attendanceList])


    //used to get unique User list
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

    const isPresent=(studentId,day)=>{
        const result = attendanceList.find(items=>
            items.day==day&&items.studentId==studentId
        )

        return result?true:false
    }
    
    
  return (
    <div>
        <div style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    </div>
  )
}

export default AttendenceGrid





