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
    DialogFooter,
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
import { Checkbox } from './ui/checkbox'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DialogClose } from '@radix-ui/react-dialog'
const InternshipDataTableforTeacherpage = ({userDat}) => {

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
    const [checked, setChecked] = useState(false);
    
    const getInternshipDetailsAsPerTeacherDeptandFilter = async () => {
        try {
            if (!userDat?.user?.department) return
            setloading(true)
            const resp = await axios.get(`/api/teacher/getinternshipdetailsasperteacherdeptandfilter?dept=${userDat?.user?.department}&sessionyear=${sessionYear.trim()}&sessionhalf=${sessionHalf?.trim()}&year=${yearOfStudy?.trim()}&semester=${semester?.trim()}&page=${page}&limit=${limit}&export`)
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
        if (userDat?.user) {
            getInternshipDetailsAsPerTeacherDeptandFilter()
        }
    }, [userDat?.user, semester, sessionHalf, sessionYear, yearOfStudy, page, limit])

    // console.log(internshipData)
    // console.log(yearOfStudy)
    // console.log(sessionYear)
    // console.log(sessionHalf)
    // console.log(semester)
       const currentYear = new Date().getFullYear();
const startYear = 2023;

// Calculate dynamic start to ensure max length = 10
const effectiveStartYear = Math.max(startYear, currentYear - 9);

const year = Array.from(
  { length: currentYear - effectiveStartYear + 1 },
  (_, i) => effectiveStartYear + i
);
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

    // console.log(page)
//Record Deletion Route
    const onDelete = async (id, offerLetterUrl, completionCertificateUrl,studentId) => {
        try {
            if (offerLetterUrl) {
                const url = new URL(offerLetterUrl);
                const pathParts = url.pathname.split('/');
                let filePath = pathParts.slice(6).join('/');

                // Decode spaces and other URL-encoded characters
                filePath = decodeURIComponent(filePath);
                // console.log('Decoded file path:', filePath);

                const { error: delError } = await supabase.storage
                    .from('internshipofferletters')
                    .remove([filePath]);

                if (delError) console.error('Error deleting old file:', delError);
                // else console.log('✅ Deleted successfully:', filePath);
            }
            if (completionCertificateUrl) {
                const url = new URL(completionCertificateUrl);
                const pathParts = url.pathname.split('/');
                let filePath = pathParts.slice(6).join('/');
                filePath = decodeURIComponent(filePath); // decode encoded path
                // console.log('Deleting completion letter:', filePath);

                const { error: delError } = await supabase.storage
                    .from('internshipcompletionletters')
                    .remove([filePath]);

                if (delError) console.error('❌ Completion letter delete error:', delError);
                // else console.log('✅ Completion letter deleted successfully:', filePath);
            }



            const resp = await axios.delete(`/api/internship/deleteinternshipbyid/${id}`,{
                  data: { studentId }
            })
            if (resp?.data?.success) {
                toast.success("Record Deleted Successfully")
                getInternshipDetailsAsPerTeacherDeptandFilter()
            }
        } catch (error) {
            console.log(error.message)
        }
    }



const handleExport = async () => {
  try {
    const resp = await axios.get(
      `/api/teacher/getinternshipdetailsasperteacherdeptandfilter?dept=${
        userDat?.user?.department
      }&sessionyear=${sessionYear.trim()}&sessionhalf=${sessionHalf.trim()}&year=${yearOfStudy.trim()}&semester=${semester.trim()}&export=excel`
    );

    if (resp.data.success) {
        // console.log(resp)
      const data = resp.data.internshipData.map((item, index) => ({
        "S.No": index + 1,
        "Student Name": item.student?.name || "N/A",
        "Enrollment No": item.student?.enrollmentNumber || "N/A",
        "Branch":item?.department,
        "Company Name": item.companyName,
        "Duration": item.duration,
        "Stipend": item.stipend,
        "Location": item.location,
        "Work Type": item.workType,
        "Start Date": item.startDate,
        "End Date": item.endDate,
        "Session Year": item.sessionYear,
        "Session Half": item.sessionHalf,
        "Year of Study": item.yearOfStudy,
        "Semester": item.semester,
        "Offer Letter": item.offerLetter,
        "Completion Letter": item.completionCertificate,

      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Internships");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `InternshipData_${sessionYear}_${sessionHalf}.xlsx`);
    }
  } catch (error) {
    console.error("Export failed:", error.message);
  }
};

    return (
        <div>
          <h1 className='text-xl font-bold m-3'>Internship Data</h1>

            <div className="flex w-full justify-end gap-2 flex-wrap items-center">
                <Dialog>
  <DialogTrigger asChild>
    <Button className="cursor-pointer select-none" disabled={loading}>
      Export to Excel
    </Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Download Excel Data</DialogTitle>
      <DialogDescription>
        Data will be downloaded in excel format as per your selected filters.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button className="cursor-pointer select-none" variant="outline">
          Cancel
        </Button>
      </DialogClose>
      <Button
        className="cursor-pointer select-none"
        onClick={handleExport}
        disabled={loading}
      >
        Download
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

                  {/* <Button className='cursor-pointer select-none' onClick={handleExport} disabled={loading}>
  Export to Excel
</Button> */}
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
                        <TableRow className='text-center'>
                            <TableHead >Sn.</TableHead>
                            <TableHead >Student Name</TableHead>
                            <TableHead >Student Enrollment No.</TableHead>
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
                            <TableHead>Session</TableHead>
                            {/* <TableHead>Session Year</TableHead> */}
                            <TableHead>Offer Letter</TableHead>
                            <TableHead>Completion Certificate</TableHead>

{
    userDat?.user?.assignedDepartmentForNocRequest === userDat?.user?.department &&
                            <TableHead>Actions</TableHead>
}

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
                                <TableRow className='text-center' key={e?._id}>
                                    <TableCell>{i + 1}.</TableCell>
                                    <TableCell className="font-bold">{e?.student?.name}</TableCell>
                                    <TableCell className="font-bold">{e?.student?.enrollmentNumber}</TableCell>
                                    <TableCell className="font-bold">{e?.companyName}</TableCell>
                                    <TableCell>{e?.role}</TableCell>
                                    <TableCell>{e?.stipend}</TableCell>
                                    <TableCell>{new Date(e?.createdAt).getDate()}/{new Date(e?.createdAt).getMonth() + 1}/{new Date(e?.createdAt).getFullYear()}</TableCell>
                                    <TableCell>{e?.duration}</TableCell>
                                    <TableCell>{e?.location}</TableCell>
                                    <TableCell>{e?.workType}</TableCell>
                                    <TableCell>{e?.startDate}</TableCell>
                                    <TableCell>{e?.endDate}</TableCell>
                                    <TableCell>{e?.yearOfStudy}</TableCell>
                                    <TableCell>{e?.semester}</TableCell>
                                    <TableCell>{e?.sessionHalf} - {e?.sessionYear}</TableCell>
                                    {/* <TableCell>{e?.sessionYear}</TableCell> */}
                                    <TableCell>
                                        {e?.offerLetter ? (
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={e?.offerLetter}
                                                className="text-blue-600 font-semibold text-md cursor-pointer select-none hover:underline hover:text-blue-500"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 font-semibold text-md select-none cursor-not-allowed">
                                                No File
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {e?.completionCertificate ? (
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={e?.completionCertificate}
                                                className="text-blue-600 font-semibold text-md cursor-pointer select-none hover:underline hover:text-blue-500"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 font-semibold text-md select-none cursor-not-allowed">
                                                No File
                                            </span>
                                        )}
                                    </TableCell>
                                    {
                                         userDat?.user?.assignedDepartmentForNocRequest === userDat?.user?.department &&
                                               <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="cursor-pointer">Action</Button>
                                            </DialogTrigger>

                                            <DialogContent className="max-w-lg">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl font-bold text-red-600">
                                                        Delete Internship Record
                                                    </DialogTitle>
                                                    <DialogDescription className="text-md text-primary">
                                                        Please review the details below before confirming deletion.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className="space-y-2 mt-4 text-sm text-popover-foreground">
                                                    <div><span className="font-semibold">Student Name:</span> {e?.student?.name}</div>
                                                    <div><span className="font-semibold">Enrollment No.:</span> {e?.student?.enrollmentNumber}</div>
                                                    <div><span className="font-semibold">Company:</span> {e?.companyName}</div>
                                                    <div><span className="font-semibold">Role:</span> {e?.role}</div>
                                                    <div><span className="font-semibold">Duration:</span> {e?.duration} days</div>
                                                    <div><span className="font-semibold">Start Date:</span> {e?.startDate}</div>
                                                    <div><span className="font-semibold">End Date:</span> {e?.endDate}</div>
                                                    <div><span className="font-semibold">Offer Letter:</span>  <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={e?.offerLetter}
                                                        className="text-blue-600 font-semibold text-md cursor-pointer select-none hover:underline hover:text-blue-500"
                                                    >
                                                        View
                                                    </a></div>
                                                    <div><span className="font-semibold">Completion Certificate:</span> <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={e?.completionCertificate}
                                                        className="text-blue-600 font-semibold text-md cursor-pointer select-none hover:underline hover:text-blue-500"
                                                    >
                                                        View
                                                    </a></div>
                                                </div>

                                                <div className="flex items-center space-x-2 mt-6">
                                                    <Checkbox
                                                        id="delete-consent"
                                                        checked={checked}
                                                        onCheckedChange={(v) => setChecked(v)}
                                                    />
                                                    <Label htmlFor="delete-consent" className="text-sm">
                                                        I understand that once deleted, this record cannot be recovered.
                                                    </Label>
                                                </div>

                                                <div className="flex justify-end gap-3 mt-6">

                                                    <Button
                                                   className='shadow-red-600 shadow-2xl'
                                                        variant="destructive"
                                                        disabled={!checked}
                                                        onClick={() => onDelete(e?._id, e?.offerLetter, e?.completionCertificate,e?.student?._id)}
                                                    >
                                                        Delete Permanently
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    }
                              

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
