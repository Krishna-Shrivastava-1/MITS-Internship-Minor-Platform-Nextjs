'use client'
import React, { useEffect, useEffectEvent, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import { FilePenLine, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import moment from 'moment'
const StudentNocRequestTable = ({ studentNocData }) => {
    // const [studentNocRequestsApplied, setstudentNocRequestsApplied] = useState([])
    const [loading, setloading] = useState(true)
    // const [limit, setlimit] = useState(10)
    const [status, setStatus] = useState('')
    // const [totalPages, settotalPages] = useState(1)
    useEffect(() => {
        if (studentNocData) {
            setloading(false)
        }
    }, [studentNocData])
    const router = useRouter();
  const searchParams = useSearchParams()
// console.log(studentNocData)
  // ✅ Read current status directly from URL
  const currentStatus = searchParams.get('status') || 'all'

  const updateStatus = (selectedStatus) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedStatus === 'all') {
      params.delete('status') // remove it from URL if “All” selected
    } else {
      params.set('status', selectedStatus)
    }

    router.push(`?${params.toString()}`)


  }
    // console.log(studentId)
    // const fetchStudentNocDetails = async () => {
    //     try {
    //         if (studentId) {
    //             const resp = await axios.get(`/api/student/getnocrequestbystudentid/${studentId}?limit=${limit}&page=${page}`)
    //             if (resp?.data?.success) {
    //                 setloading(false)
    //                 // console.log(resp.data)
    //                 setstudentNocRequestsApplied(resp?.data?.nocRequests)
    //                 settotalPages(Math.ceil((resp?.data?.totalRequests) / limit))
    //             }
    //             if (!resp?.data?.success) {
    //                 setstudentNocRequestsApplied(resp?.data?.message)
    //                 setloading(false)
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error.message)
    //         setloading(false)
    //     }
    // }
    // useEffect(() => {
    //     if (studentId) {
    //         fetchStudentNocDetails()
    //     }
    // }, [studentId, page, limit])
    // const handlePageIncrease = () => {
    //     if (page < totalPages) {
    //         setpage((pre) => pre + 1)
    //     }
    // }

    // const handlePageDecrease = () => {
    //     if (page > 1) {
    //         setpage((pre) => pre - 1)
    //     }
    // }
    // console.log(studentNocData)
    // console.log(status)
    return (
        <div className='p-2 px-4'>
            <div className='flex items-center justify-end w-full pr-4 gap-x-4 '>
                     <Select value={currentStatus} onValueChange={updateStatus}>
                <SelectTrigger>
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Approve">Approve</SelectItem>
                    <SelectItem value="Reject">Reject</SelectItem>
                    <SelectItem value="Allow Edit">Allow Edit</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
            </Select> 
            </div>
      

            <Table >
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead >Sn.</TableHead>
                        <TableHead >Department Status</TableHead>
                        <TableHead>Training & Placement Status</TableHead>
                        <TableHead >Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Reciever Name</TableHead>
                        <TableHead>Reciever Designation</TableHead>
                        <TableHead>Stipend (in Rs.)</TableHead>
                        <TableHead>Duration (in Days.)</TableHead>
                        <TableHead>Work Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Request CreatedAt</TableHead>
                        <TableHead>Year of Study</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Session Half</TableHead>
                        <TableHead>Session Year</TableHead>
                        <TableHead>Offer Letter</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Edit</TableHead>


                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6">
                                <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-700" />
                                <span className="block text-sm text-gray-500 mt-2">Loading NOC Requests...</span>
                            </TableCell>
                        </TableRow>
                    ) : studentNocData?.length > 0 ? (
                        studentNocData.map((e, i) => (
                            <TableRow key={e?._id}>

                                <TableCell>{i + 1}.</TableCell>
                                {/* <TableCell className="font-bold">{e?.teacherAction}</TableCell> */}
                                <TableCell className="font-bold">{e?.teacherAction === 'Pending' ? <span className='text-yellow-600 rounded-full px-2 p-1 text-center border border-yellow-800 bg-orange-500/20'>{e?.teacherAction}</span> : e?.teacherAction === 'Approve' ? <span className='text-green-600 rounded-full px-2 p-1 text-center border border-green-800 bg-green-500/20'>{e?.teacherAction}</span> : e?.teacherAction === 'Reject' ? <span className='text-red-600 rounded-full px-2 p-1 text-center border border-red-800 bg-red-500/20'>{e?.teacherAction}</span> : <span className='text-sky-600 rounded-full px-2 p-1 text-center border border-sky-700 bg-sky-500/20'>{e?.teacherAction}</span>}</TableCell>
                                <TableCell className="font-bold ">
                                    {

                                        e?.tAndPAction === 'Pending' ? <span className='text-yellow-600 rounded-full px-2 p-1 text-center border border-yellow-800 bg-orange-500/20'>{e?.tAndPAction}</span> : e?.tAndPAction === 'Approve' ? <span className='text-green-600 rounded-full px-2 p-1 text-center border border-green-800 bg-green-500/20'>{e?.tAndPAction}</span> : <span className='text-red-600 rounded-full px-2 p-1 text-center border border-red-800 bg-red-500/20'>{e?.tAndPAction}</span>
                                    }
                                </TableCell>
                                {/* <TableCell className="font-bold ">{e?.tAndPAction === 'Pending' ? <span className='text-yellow-600 rounded-full px-2 p-1 text-center border border-yellow-800 bg-orange-500/20'>{e?.tAndPAction}</span> : e?.tAndPAction === 'Approve' ? <span className='text-green-600 rounded-full px-2 p-1 text-center border border-green-800 bg-green-500/20'>{e?.tAndPAction}</span> : <span className='text-red-600 rounded-full px-2 p-1 text-center border border-red-800 bg-red-500/20'>{e?.tAndPAction}</span>}</TableCell> */}
                                <TableCell className="font-bold">{e?.companyName}</TableCell>
                                <TableCell>{e?.role}</TableCell>
                                <TableCell>{e?.recieverName}</TableCell>
                                <TableCell>{e?.recieverDesignation}</TableCell>
                                <TableCell>{e?.stipend}</TableCell>
                                <TableCell>{e?.duration}</TableCell>
                                <TableCell>{e?.workType}</TableCell>
                                <TableCell> {moment(e?.startDate).format("DD-MMM-YYYY")}</TableCell>
                                <TableCell>  {moment(e?.endDate).format("DD-MMM-YYYY")}</TableCell>
                              <TableCell className='text-center'>
  {moment(e?.createdAt).format("DD-MMM-YYYY")}
<span className='ml-2'>
      {
    // Calculate the difference in days
    moment().diff(moment(e?.createdAt), 'days') < 1
      ? moment(e?.createdAt).fromNow() // Show "from now" if less than 5 days
      : '' // Hide "from now" if 5 days or more
  }
</span>
</TableCell>
                                <TableCell className='text-center'>{e?.yearOfStudy}</TableCell>
                                <TableCell className='text-center'>{e?.semester}</TableCell>
                                <TableCell>{e?.sessionHalf}</TableCell>
                                <TableCell>{e?.sessionYear}</TableCell>
                                <TableCell>
                                    {e?.offerLetter ? (
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={e.offerLetter}
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

                                <TableCell className='text-center'><Textarea defaultValue={e?.comment || 'No Comments'}
                                    readOnly
                                    className='whitespace-pre-wrap resize-none h-10 w-52' /></TableCell>
                              <TableCell className="text-center">
  {e?.teacherAction === "Allow Edit" ? (
    <Link href={`/home/edit-noc/${e?._id}`}>
      <FilePenLine
        className="
          size-7 cursor-pointer select-none rounded-full p-1
          text-[var(--sidebar-text)]
          hover:bg-[var(--sidebar-hover-bg)]
          hover:text-[var(--sidebar-hover-text)]
          transition-colors duration-200
        "
      />
    </Link>
  ) : (
    <FilePenLine
      className="
        size-7 cursor-not-allowed select-none rounded-full p-1
        text-[var(--muted-foreground)]
        opacity-60
      "
    />
  )}
</TableCell>



                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6 text-gray-500">
                                No NOC Records Yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>


            </Table>
            {/* <div className='flex items-center justify-end w-full pr-4 gap-x-4 '>
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
                                <PaginationLink >{totalPages || 1}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext className='select-none cursor-pointer' onClick={handlePageIncrease} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div> */}
        </div>
    )
}

export default StudentNocRequestTable
