"use client"
import React, { useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { addMonths } from 'date-fns'
import moment from 'moment/moment'
import { Calendar } from "@/components/ui/calendar"

function MonthSelection({selectedMonth}) {

    const today = Date();

    const nextMonths=addMonths(new Date(),0)

    const[month,setMonth] = useState(nextMonths)

  return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='flex gap-2 items-center text-slate-700'>
                    <CalendarDays className='h-5 w-5' />
                    {moment(month).format('MMM yyyy')}
                    {/* Month  */}
                    {/* Month not used when calling moment */}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    month={month}
                    onMonthChange={(value)=>{selectedMonth(value),setMonth(value)}
                    }
                    className="rounded-lg border"
                />
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default MonthSelection
