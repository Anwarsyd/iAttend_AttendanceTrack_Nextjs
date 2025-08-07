import { mysqlTable,int, varchar,boolean } from "drizzle-orm/mysql-core";
import { Contact, Phone } from "lucide-react";

export const GRADES = mysqlTable('grades',{
    id:int('id').primaryKey(),
    grade:varchar('grade',{length:10}).notNull(),
})

export const STUDENTS = mysqlTable('students',{
    id:int('id').autoincrement().primaryKey(),
    name:varchar('name',{length:20}).notNull(),
    grade:varchar('grade',{length:10}).notNull(),
    address:varchar('address',{length:50}),
    contact:varchar('contact',{length:11})
})

export const ATTENDANCE=mysqlTable('attendance',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    studentId:int('studentId',{length:11}).notNull(),
    present: boolean('present').default(false),
    day:int('day',{length:11}).notNull(),  //28
    date:varchar('date',{length:20}).notNull() //07/2024
})