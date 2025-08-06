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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


function StudentListTable({studentList}) {
    const [rowData, setRowData] = useState();

    const[searchInput,setSearchInput] = useState()

    const [colDefs, setColDefs] = useState([
        {field:"id",filter:true },
        {field:"name",filter:true },
        {field:"address",filter:true },
        {field:"contact",filter:true },
        {field:"action",cellRenderer:customButtons}
    ]);

    useEffect(()=>{
        studentList&&setRowData(studentList)
    },[studentList])

    const customButtons=({props})=>{
    return <Button><Trash /></Button>
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
