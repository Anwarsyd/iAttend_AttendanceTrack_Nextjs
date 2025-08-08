import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';


ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
// sets 10 rows per page (default is 100)
const paginationPageSize = 10;

// allows the user to select the page size from a predefined list of page sizes
const paginationPageSizeSelector = [10, 20, 50, 100];

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';


function StudentListTable({studentList,refreshData}) {
    const [rowData, setRowData] = useState();

    const[searchInput,setSearchInput] = useState()

    const customButtons=(props)=>{
    return (
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size='sm'><Trash /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your record
                            and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        
        </div>
    )
}
    const [colDefs, setColDefs] = useState([
        {field:"id",filter:true },
        {field:"name",filter:true },
        {field:"address",filter:true },
        {field:"grade",filter:true},
        {field:"contact",filter:true },
        {field:"action",cellRenderer:customButtons}
    ]);

    useEffect(()=>{
        studentList&&setRowData(studentList)
    },[studentList])

    const DeleteRecord=(id)=>{
        GlobalApi.DeleteStudentRecord(id).then(resp=>{
            if(resp){
                toast('Record Deleted Successfully')
                refreshData();
            }
        })
    }
    
  return (
    <div className='my-7'>
        <div className='flex p-2 rounded-lg border shadow-sm gap-2 mb-4 max-w-sm'>
            <Search />
            <input type='text' placeholder='Search about students...' className='outline-none w-full'
            onChange={(event)=>setSearchInput(event.target.value)} />
        </div>
        <div className='rounded-md border' style={{ height: 500}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onGridReady={(params) => params.api.sizeColumnsToFit()} //for fit to all cloumn
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}

                    quickFilterText={searchInput}
                />
            </div>
    </div>
  )
}

export default StudentListTable
