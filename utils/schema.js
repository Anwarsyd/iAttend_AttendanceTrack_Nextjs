import { mysqlTable,int, varchar } from "drizzle-orm/mysql-core";
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