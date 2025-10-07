'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'
import { DepartmentSelectorforStudentRegister } from './DepartmentSelectorforStudentRegister'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
const AllTeacherDataForSuperAdmin = ({ allTeacherDataProp }) => {
  const [allTeacherData, setAllTeacherData] = useState(allTeacherDataProp||[]);
  const [newTeacherName, setnewTeacherName] = useState('')
  const [newDepartmentValue, setnewDepartmentValue] = useState('')
  const [newassignedNOCDepartment, setnewassignedNOCDepartment] = useState('')
  const [dialogueOpen, setdialogueOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  // console.log(newTeacherName)
  // console.log(newDepartmentValue)
  // console.log(newassignedNOCDepartment)
  useEffect(() => {
    if(Array.isArray(allTeacherDataProp) && allTeacherDataProp.length > 0){
      setAllTeacherData(allTeacherDataProp ||[])
    }
  }, [allTeacherDataProp])
  
  // console.log(allTeacherData)
  const openDialog = (teacher) => {
  setSelectedTeacher(teacher);
  setnewTeacherName(teacher.name);
  setnewDepartmentValue(teacher.department);
  setnewassignedNOCDepartment(teacher.assignedDepartmentForNocRequest || "");
  setdialogueOpen(true);
};
  const updateTeacher = async (id) => {
    try {
        if (
      newTeacherName === selectedTeacher?.name &&
      newDepartmentValue === selectedTeacher?.department &&
      newassignedNOCDepartment === (selectedTeacher?.assignedDepartmentForNocRequest || "")
    ) {
      // console.log('nope')
      // toast("N")
       toast("No changes detected — nothing to update.", {
    icon: 'ℹ️',
    style: {
      border: '1px solid #2563eb',     // blue-600 border
      // padding: '14px 16px',
      color: '#ffffff',                 // blue-600 text
      background: '#04417a',            // white background
      fontWeight: 500,
      borderRadius: '8px',
    },
    iconTheme: {
      primary: '#2563eb',               // blue icon background
      secondary: '#ffffff',             // white icon
    },
  });

      setdialogueOpen(false);
      
      return // ⛔ Stop execution here
    }
      const resp = await axios.put(`/api/superadmin/editteacher/${id}`, {
        department: newDepartmentValue,
        assignednocdepartment: newassignedNOCDepartment,
        name: newTeacherName
      })
        if(!resp?.data?.success){
          toast.error(resp?.data?.message)
        console.log(resp?.data?.message)
      
        setdialogueOpen(false)
      }
      if(resp?.data?.success){
        // console.log(resp?.data?.message)
        toast.success("Teacher Updated Successfully")
        setAllTeacherData((prev)=>prev.map((t)=>t?._id === id ? {...t,name:newTeacherName,assignedDepartmentForNocRequest:newassignedNOCDepartment,department:newDepartmentValue} : t))
        setdialogueOpen(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <Table className='border'>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead >Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Coordinator of Department</TableHead>
            <TableHead>More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allTeacherData?.map((e) => (
              <TableRow key={e?._id}>
                {/* {console.log(e)} */}
                <TableCell className="font-semibold">{e?.name}</TableCell>
                <TableCell>{e?.department}</TableCell>
                <TableCell>{e?.assignedDepartmentForNocRequest || 'Not Assigned'}</TableCell>
             <TableCell>
  <span
    onClick={() => openDialog(e)}
    className="bg-neutral-950 p-2 rounded-md cursor-pointer select-none text-white font-semibold hover:bg-neutral-900"
  >
    Actions
  </span>

  {dialogueOpen && (
    <div  onClick={() => setdialogueOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div onClick={(e)=>e.stopPropagation()} className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-[90%] max-w-md border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-lg font-semibold mb-3">Assign NOC Coordinator</h2>

        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-sm mb-1">Teacher Name</h3>
            <Input
              value={newTeacherName}
              onChange={(e) => setnewTeacherName(e.target.value)}
            />
          </div>

          <div>
            <h3 className="font-medium text-sm mb-1">Teacher Department</h3>
            <DepartmentSelectorforStudentRegister
              initialDepartment={newDepartmentValue}
              getDepartmentValue={setnewDepartmentValue}
              settheme={"light"}
            />
          </div>

          <div>
            <h3 className="font-medium text-sm mb-1">Assigned NOC Department</h3>
            <DepartmentSelectorforStudentRegister
              initialDepartment={newassignedNOCDepartment}
              getDepartmentValue={setnewassignedNOCDepartment}
              settheme={"light"}
            />
          </div>

          <div className="flex justify-end mt-5 gap-3">
            <Button
              variant="secondary"
              onClick={() => setdialogueOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => updateTeacher(selectedTeacher._id)}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  )}
</TableCell>


              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default AllTeacherDataForSuperAdmin
