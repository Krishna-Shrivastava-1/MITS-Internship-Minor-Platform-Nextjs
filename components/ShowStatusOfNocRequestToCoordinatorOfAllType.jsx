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
const ShowStatusOfNocRequestToCoordinatorOfAllType = ({ coordinatorDepartment, nameOfApi }) => {
    const [loading, setloading] = useState(true)
    const [nocRequestsDataPending, setnocRequestsDataPending] = useState([])
    const [limit, setlimit] = useState(10)
    const [page, setpage] = useState(1)
    const [totalPages, settotalPages] = useState(1)
    // const [teacherDecision, setteacherDecision] = useState('')
    // const [comment, setcomment] = useState('')
    // const [open, setopen] = useState(false)
    const fetchNocRequestArePending = async () => {
        try {
            if (!coordinatorDepartment) return
            setloading(true)
            const resp = await axios.get(`/api/nocrequests/getnocrequestforcoordinator${nameOfApi}?assignedDepartment=${coordinatorDepartment}&page=${page}&limit=${limit}`)
            if (resp?.data?.success) {
                setloading(false)
                // console.log(resp?.data)
                settotalPages(Math.ceil((resp?.data?.countOfNocRequests) / limit))
                setnocRequestsDataPending(resp?.data?.getNocRequestArePending)

            }
        } catch (error) {
            console.log(error.message)
            setloading(false)
        }
    }
    useEffect(() => {
        if (coordinatorDepartment) {

            fetchNocRequestArePending()
        } else {
            setloading(false)
        }

    }, [coordinatorDepartment, page, limit])
    const handlePageIncrease = () => {
        if (page < totalPages) {
            setpage((pre) => pre + 1)
        } else {
            setloading(false)
        }
    }

    const handlePageDecrease = () => {
        if (page > 1) {
            setpage((pre) => pre - 1)
        }
    }
    // const handleNocDecision = async (id) => {
    //     try {
    //         const resp = await axios.put(`/api/nocrequests/updatenocdecision/${id}`, {
    //             decisionOfNoc: teacherDecision,
    //             comment
    //         })
    //         if (resp?.data) {
    //             console.log(resp?.data)
    //             fetchNocRequestArePending()
    //             setopen(false)
    //         }
    //     } catch (error) {
    //         console.log(error?.message)
    //     }
    // }
    // console.log(teacherDecision)
    return (
        <div className="w-full overflow-x-auto border p-2 px-5">
            <Table >
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead >Sn.</TableHead>
                        <TableHead >Status</TableHead>
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
                        <TableHead>Offer Letter</TableHead>
                        <TableHead>Comment</TableHead>
                        {/* <TableHead>More</TableHead> */}

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
                    ) : nocRequestsDataPending?.length > 0 ? (
                        nocRequestsDataPending?.map((e, i) => (
                            <TableRow key={e?._id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell className="font-bold">{e?.teacherAction}</TableCell>
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
                                {/* <TableCell>
                                    <Dialog isOpen={open} onOpenChange={setopen}>
                                        <DialogTrigger>Actions</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Respond to the NOC Requests</DialogTitle>
                                                <div>
                                               <div className='flex items-center'>
                                                 <h2>Your Response:</h2>
                                                    <Select value={teacherDecision ? teacherDecision : e?.teacherAction} onValueChange={setteacherDecision}>
                                                        <SelectTrigger >
                                                            <SelectValue placeholder="Limit" />
                                                        </SelectTrigger>
                                                        <SelectContent >
                                                            <SelectItem value="Pending">None</SelectItem>
                                                            <SelectItem value="Approve">Approve</SelectItem>
                                                            <SelectItem value="Reject">Reject</SelectItem>
                                                            <SelectItem value="Allow Edit">Allow Edit</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                               </div>
                                                    <h2>Write Comment</h2>
                                                    <Textarea onChange={(e) => setcomment(e?.target?.value)} value={comment} placeholder='Enter Comment...' className='resize-none border-black whitespace-pre-wrap' />
                                                    <div className='w-full flex items-center justify-center'>

                                                        <Button onClick={() => handleNocDecision(e?._id)} className='w-full cursor-pointer select-none mt-3'>Submit</Button>
                                                    </div>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell> */}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6 text-gray-500">
                                No NOC Records Found
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

export default ShowStatusOfNocRequestToCoordinatorOfAllType
