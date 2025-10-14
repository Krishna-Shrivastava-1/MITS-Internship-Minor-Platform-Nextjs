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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import { DepartmentSelectorforStudentRegister } from './DepartmentSelectorforStudentRegister'
const SuperAdminNOCRequestsTable = () => {
    const [loading, setloading] = useState(true)
    const [nocRequestsDataPending, setnocRequestsDataPending] = useState([])
    const [limit, setlimit] = useState(10)
    const [page, setpage] = useState(1)
    const [totalPages, settotalPages] = useState(1)
    const [tandpdecision, settandpdecision] = useState('Pending')
    const [open, setopen] = useState(false)
    const [selectDepartment, setselectDepartment] = useState('all')
    // console.log(selectDepartment)
    const fetchNocRequestArePending = async () => {
        try {
            if (!selectDepartment) return setloading(false)
            setloading(true)
            const resp = await axios.get(`/api/nocrequests/getnocrequestfortandp?assignedDepartment=${selectDepartment}&page=${page}&limit=${limit}`)
            if (resp?.data?.success) {
                setloading(false)
                // console.log(resp?.data)
                settotalPages(Math.ceil((resp?.data?.countOfNocRequests) / limit))
                setnocRequestsDataPending(resp?.data?.getNocRequestArePending)

            }
            if (!resp?.data?.success) {
                setloading(false)
                console.log(resp?.data)


            }
        } catch (error) {
            console.log(error.message)
            setloading(false)
        }
    }
    useEffect(() => {
        if (selectDepartment != 'all') {

            fetchNocRequestArePending()
        } else {
            setloading(false)
        }

    }, [selectDepartment, page, limit])
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
    const handleNocDecision = async (id) => {
        try {
            if (tandpdecision === 'Pending') {
                setopen(false)
                toast("Nothing to update.", {
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

                return
            }
         

            const resp = await axios.put(`/api/nocrequests/updatenocdecisiontandp/${id}`, {
                decisionOfNoc: tandpdecision,
              
            })
            if (resp?.data) {
                // console.log(resp?.data)
                toast.success(resp?.data?.message)
                fetchNocRequestArePending()
                setopen(false)
            }
            if (!resp?.data) {
                // console.log(resp?.data)
                toast.error("Noc is not Updated")
                fetchNocRequestArePending()
                setopen(false)
            }
        } catch (error) {
            console.log(error?.message)
            toast.error("Felt it is not worked but don't felt it is not you error")
            setopen(false)
        }
    }
    // console.log(tandpdecision)
    return (
        <div className="w-full overflow-x-auto border p-2 px-5">
            <div className='flex items-center flex-wrap'>
<h1 className='text-blue-700 font-bold text-lg'>Select a Department for NOC Request Review</h1>
             <DepartmentSelectorforStudentRegister getDepartmentValue={setselectDepartment} settheme={"light"} />
            </div>
             
            <Table >
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead >Sn.</TableHead>
                        <TableHead>Department Status</TableHead>
                        <TableHead>Training & Placement Status</TableHead>
                        <TableHead>Enrollment Number</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead >Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Reciever Name</TableHead>
                        <TableHead>Reciever Designation</TableHead>
                        <TableHead>Stipend (in Rs.)</TableHead>
                        <TableHead>Duration (in Days.)</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Work Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Year of Study</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Session Half</TableHead>
                        <TableHead>Session Year</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Offer Letter</TableHead>
                        <TableHead>More</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6">
                                <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-700" />
                                <span className="block text-sm text-gray-500 mt-2">Loading NOC's...</span>
                            </TableCell>
                        </TableRow>
                    ) : nocRequestsDataPending?.length > 0 ? (
                        nocRequestsDataPending?.map((e, i) => (
                            <TableRow key={e?._id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell className="font-bold">{e?.teacherAction === 'Pending' ? <span className='text-yellow-600 rounded-full px-2 p-1 text-center border border-yellow-800 bg-orange-500/20'>{e?.teacherAction}</span> : e?.teacherAction === 'Approve' ? <span className='text-green-600 rounded-full px-2 p-1 text-center border border-green-800 bg-green-500/20'>{e?.teacherAction}</span>  : e?.teacherAction === 'Reject' ? <span className='text-red-600 rounded-full px-2 p-1 text-center border border-red-800 bg-red-500/20'>{e?.teacherAction}</span> : <span className='text-sky-600 rounded-full px-2 p-1 text-center border border-sky-700 bg-sky-500/20'>{e?.teacherAction}</span>   }</TableCell>
                                <TableCell className="font-bold flex items-center justify-center">{e?.tAndPAction === 'Pending' ? <span className='text-yellow-600 rounded-full px-2 p-1 text-center border border-yellow-800 bg-orange-500/20'>{e?.tAndPAction}</span> : e?.tAndPAction === 'Approve' ? <span className='text-green-600 rounded-full px-2 p-1 text-center border border-green-800 bg-green-500/20'>{e?.tAndPAction}</span>  :  <span className='text-red-600 rounded-full px-2 p-1 text-center border border-red-800 bg-red-500/20'>{e?.tAndPAction}</span>    }</TableCell>
                                <TableCell className="font-bold">{e?.enrollmentNumber}</TableCell>
                                <TableCell className="font-bold">{e?.student?.name}</TableCell>
                                <TableCell className="font-bold">{e?.companyName}</TableCell>
                                <TableCell>{e?.role}</TableCell>
                                <TableCell>{e?.recieverName}</TableCell>
                                <TableCell>{e?.recieverDesignation}</TableCell>
                                <TableCell>{e?.stipend}</TableCell>
                                <TableCell>{e?.duration}</TableCell>
                                <TableCell>{e?.location}</TableCell>
                                <TableCell>{e?.workType}</TableCell>
                                <TableCell>{e?.startDate}</TableCell>
                                <TableCell>{e?.endDate}</TableCell>
                                <TableCell className='text-center'>{e?.yearOfStudy}</TableCell>
                                <TableCell className='text-center'>{e?.semester}</TableCell>
                                <TableCell>{e?.sessionHalf}</TableCell>
                                <TableCell>{e?.sessionYear}</TableCell>
                                <TableCell>{new Date(e?.createdAt).getDate()}/{new Date(e?.createdAt).getMonth() + 1}/{new Date(e?.createdAt).getFullYear()}</TableCell>
                                <TableCell>{new Date(e?.updatedAt).getDate()}/{new Date(e?.updatedAt).getMonth() + 1}/{new Date(e?.updatedAt).getFullYear()}</TableCell>
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

                                <TableCell>
                                    <Dialog isOpen={open} onOpenChange={setopen}>
                                        <DialogTrigger>Actions</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Respond to the NOC Requests</DialogTitle>
                                                <div>
                                                    <div className='flex items-center'>
                                                        <h2>Your Response:</h2>
                                                        <Select value={tandpdecision ? tandpdecision : e?.tAndPAction} onValueChange={settandpdecision}>
                                                            <SelectTrigger >
                                                                <SelectValue placeholder="Response" />
                                                            </SelectTrigger>
                                                            <SelectContent >
                                                                <SelectItem value="Pending">None</SelectItem>
                                                                <SelectItem value="Approve">Approve</SelectItem>
                                                                <SelectItem value="Reject">Reject</SelectItem>
                                                                
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                   
                                                    <div className='w-full flex items-center justify-center'>

                                                        <Button onClick={() => handleNocDecision(e?._id)} className='w-full cursor-pointer select-none mt-3'>Submit</Button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6 text-gray-500">
                                No NOC records found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>


            </Table>
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
                                <PaginationLink >{totalPages || 1}</PaginationLink>
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

export default SuperAdminNOCRequestsTable
