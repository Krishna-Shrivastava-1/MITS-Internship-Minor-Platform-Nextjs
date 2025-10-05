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
  console.log(newassignedNOCDepartment)
  useEffect(() => {
    if(Array.isArray(allTeacherDataProp) && allTeacherDataProp.length > 0){
      setAllTeacherData(allTeacherDataProp ||[])
    }
  }, [allTeacherDataProp])
  
  console.log(allTeacherData)
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
      console.log('nope')
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
                {console.log(e)}
                <TableCell className="font-semibold">{e?.name}</TableCell>
                <TableCell>{e?.department}</TableCell>
                <TableCell>{e?.assignedDepartmentForNocRequest || 'Not Assigned'}</TableCell>
                <TableCell>
                 <Dialog open={dialogueOpen} onOpenChange={setdialogueOpen}>
  <DialogTrigger onClick={() => openDialog(e)}><span className='bg-neutral-950 p-2 rounded-md cursor-pointer select-none text-white font-semibold hover:bg-neutral-900'>Actions</span></DialogTrigger>
  <DialogContent>
    {selectedTeacher && (
      <DialogHeader>
        <DialogTitle>Assign NOC Coordinator</DialogTitle>
        <h2>Teacher Name</h2>
        <Input value={newTeacherName} onChange={(e) => setnewTeacherName(e.target.value)} />

        <h2>Teacher Department</h2>
        <DepartmentSelectorforStudentRegister
          initialDepartment={newDepartmentValue}
          getDepartmentValue={setnewDepartmentValue}
          settheme={'light'}
        />

        <h2>Assigned NOC Department</h2>
        <DepartmentSelectorforStudentRegister
          initialDepartment={newassignedNOCDepartment}
          getDepartmentValue={setnewassignedNOCDepartment}
          settheme={'light'}
        />

        <Button className='cursor-pointer select-none font-semibold' onClick={() => updateTeacher(selectedTeacher._id)}>Update</Button>
      </DialogHeader>
    )}
  </DialogContent>
</Dialog>

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
