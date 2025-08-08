import React, { useEffect, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const pagination = true;

const paginationPageSize = 10;

const paginationPageSizeSelector = [10, 20, 50, 100];

function AttendenceGrid({attendanceList,selectedMonth}) {

    const [rowData,setRowData]=useState()
    const [colDefs,setColDefs]=useState([
        { field : 'studentId',filter:true},
        { field : 'name',filter:true},
    ])

    //days in month
    const daysInMonth=(year,month)=>new Date(year,month,0).getDate()
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

    const onMarkAttendance=(day,studentId,presentStatus)=>{

        const date = moment(selectedMonth).format('MM/yyyy')
        if(presentStatus){
            const data ={
                day:day,
                studentId:studentId,
                present:presentStatus,
                date:date
            }
            GlobalApi.MarkAttendance(data).then(resp=>{
                // console.log(resp);
                toast("Student id:" +studentId+ "Mark as Present")
                
            })
        }
        else{
            GlobalApi.MarkAbsent(studentId,day,date).then(resp=>{
                toast("Student id:"+studentId+ "Mark as Absent")
            })
        }
    }
    
    
  return (
    <div>
        <div style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}

                onCellValueChanged={(event)=>onMarkAttendance(event.colDef.field,event.data.studentId,event.newValue)}

                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}

            />
        </div>
    </div>
  )
}

export default AttendenceGrid





