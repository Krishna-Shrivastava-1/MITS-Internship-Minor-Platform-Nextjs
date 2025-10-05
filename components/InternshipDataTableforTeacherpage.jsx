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
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DataProviderContextAPI } from './ContextApi'
import { Button } from './ui/button'
const InternshipDataTableforTeacherpage = () => {
    const {fetchUserByIdState} = DataProviderContextAPI()
    const [internshipData, setinternshipData] = useState([])
    const [limit, setlimit] = useState(10)
    const [page, setpage] = useState(1)
    const [sessionYear, setsessionYear] = useState('')
    const [sessionHalf, setsessionHalf] = useState('')
    const [semester, setsemester] = useState('')
    const [yearOfStudy, setyearOfStudy] = useState('')
    const [totalPages, settotalPages] = useState(1)
    const [loading, setloading] = useState(true)
    const [selectedStudent, setSelectedStudent] = useState(null);

    // console.log(fetchUserByIdState)
    const getInternshipDetailsAsPerTeacherDeptandFilter = async () => {
        try {
            if (!fetchUserByIdState?.department) return
            setloading(true)
            const resp = await axios.get(`/api/teacher/getinternshipdetailsasperteacherdeptandfilter?dept=${fetchUserByIdState?.department}&sessionyear=${sessionYear.trim()}&sessionhalf=${sessionHalf?.trim()}&year=${yearOfStudy?.trim()}&semester=${semester?.trim()}&page=${page}&limit=${limit}`)
            if (resp?.data?.success) {
                setloading(false)
                // console.log(resp?.data)
                setinternshipData(resp?.data?.internshipData)
                settotalPages(Math.ceil(resp?.data?.totalInternshipDocs / limit))
            }
            if (!resp?.data?.success) {
                setloading(false)
            }

        } catch (error) {
            setloading(false)
            console.log(error.message)

        }
    }
    useEffect(() => {
        if (fetchUserByIdState) {
            getInternshipDetailsAsPerTeacherDeptandFilter()
        }
    }, [fetchUserByIdState, semester, sessionHalf, sessionYear, yearOfStudy, page, limit])

    // console.log(internshipData)
    // console.log(yearOfStudy)
    // console.log(sessionYear)
    // console.log(sessionHalf)
    // console.log(semester)
    const currentYear = new Date().getFullYear()
    const year = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i)
    const handlePageIncrease = () => {
        if (page < totalPages) {
            setpage((pre) => pre + 1)
        }
    }

    const handlePageDecrease = () => {
        if (page > 1) {
            setpage((pre) => pre - 1)
        }
    }
const fetchStdudentDetails = async (id) => {
    try {
        const resp = await axios.get(`/api/student/getstudentbyid/${id}`)
        if(resp?.data?.success){
            // console.log(resp?.data)
            setSelectedStudent(resp?.data?.user)
        }
        if(!resp?.data?.success){
            console.log("error in fetching")
             setSelectedStudent(null);
        }
    } catch (error) {
        console.log(error.message)
         setSelectedStudent(null);
    }
}
    // console.log(page)
    return (
        <div>
            <div className="flex w-full justify-end gap-4 flex-wrap items-center">
                <div>
                    <Label>Year of Study</Label>
                    <Select value={yearOfStudy} onValueChange={setyearOfStudy}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" ">All</SelectItem>
                            {[1, 2, 3, 4].map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label>Semester</label>
                    <Select value={semester} onValueChange={setsemester}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" ">All</SelectItem>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <SelectItem key={s} value={String(s)}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label>Session Half</label>
                    <Select value={sessionHalf} onValueChange={setsessionHalf}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Session Half" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" ">All</SelectItem>
                            {["Jan-Jun", "Jul-Dec"].map(sh => <SelectItem key={sh} value={sh}>{sh}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Session Year</label>
                    <Select value={sessionYear} onValueChange={setsessionYear}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Session Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value=" ">All</SelectItem>
                            {year.map(sh => <SelectItem key={sh} value={String(sh)}>{sh}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-full overflow-x-auto border p-2 px-5">
                <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead >Sn.</TableHead>
                        <TableHead >Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Stipend (in Rs.)</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Duration (in Days.)</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Work Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Year of Study</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Session Half</TableHead>
                        <TableHead>Session Year</TableHead>
                        <TableHead>Details</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6">
                                <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-700" />
                                <span className="block text-sm text-gray-500 mt-2">Loading internships...</span>
                            </TableCell>
                        </TableRow>
                    ) : internshipData?.length > 0 ? (
                        internshipData.map((e, i) => (
                            <TableRow key={e?._id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell className="font-bold">{e?.companyName}</TableCell>
                                <TableCell>{e?.role}</TableCell>
                                <TableCell>{e?.stipend}</TableCell>
                                <TableCell>{new Date(e?.createdAt).getDate()}/{new Date(e?.createdAt).getMonth()+1}/{new Date(e?.createdAt).getFullYear()}</TableCell>
                                <TableCell>{e?.duration}</TableCell>
                                <TableCell>{e?.location}</TableCell>
                                <TableCell>{e?.workType}</TableCell>
                                <TableCell>{e?.startDate}</TableCell>
                                <TableCell>{e?.endDate}</TableCell>
                                <TableCell>{e?.yearOfStudy}</TableCell>
                                <TableCell>{e?.semester}</TableCell>
                                <TableCell>{e?.sessionHalf}</TableCell>
                                <TableCell>{e?.sessionYear}</TableCell>
                              <TableCell>
  <Dialog>
    <DialogTrigger asChild onClick={() => fetchStdudentDetails(e?.student)}>
      <Button className='cursor-pointer'>View</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Student Details</DialogTitle>
        {selectedStudent ? (
          <div className="mt-2 space-y-1">
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            {/* <p><strong>Email:</strong> {selectedStudent.email}</p> */}
            <p><strong>Enrollment No:</strong> {selectedStudent.enrollmentNumber}</p>
            <p><strong>Department:</strong> {selectedStudent.department}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </DialogHeader>
    </DialogContent>
  </Dialog>
</TableCell>

                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6 text-gray-500">
                                No internship records found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>


            </Table> 
            </div>
           
            <div className='flex items-center justify-end w-full pr-4 gap-x-4 '>
                <Select value={limit.toString()} onValueChange={setlimit}>
                    <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="Limit" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious className='select-none cursor-pointer' onClick={handlePageDecrease} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink >{page}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink >{totalPages}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext className='select-none cursor-pointer' onClick={handlePageIncrease} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>

        </div>
    )
}

export default InternshipDataTableforTeacherpage
