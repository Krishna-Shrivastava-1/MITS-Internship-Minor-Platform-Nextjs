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
import { Loader2 } from 'lucide-react'
import useSWR from 'swr'
const fetcher = (url) => axios.get(url).then((res) => res.data)
const StudentPageInternshipDetails = ({ studentId }) => {
    const [internshipData, setinternshipData] = useState([])
    const [loading, setloading] = useState(true)
    // console.log(studentId)

 const { data, error, isLoading, mutate } = useSWR(
    studentId ? `/api/student/getinternshipdetailsofstudentbyid/${studentId}` : null,
    fetcher,
    {
      revalidateOnFocus: true, // auto refresh when user switches tab or focuses page again
      dedupingInterval: 120000, // cache data for 60 seconds to prevent redundant calls
    }
  );

  
//   if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  const internships = data?.success ? data?.internships : [];
// console.log(internships)
    // const fetchStudentInternshipDetails = async () => {
    //     try {
    //         if (studentId) {
    //             const resp = await axios.get(`/api/student/getinternshipdetailsofstudentbyid/${studentId}`)
    //             if (resp?.data?.success) {
    //                 setloading(false)
    //                 setinternshipData(resp?.data?.internships)

    //             }
    //             if (!resp?.data?.success) {
    //                 setinternshipData(resp?.data?.message)
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
    //         fetchStudentInternshipDetails()
    //     }
    // }, [studentId])

    // console.log(internshipData)
    return (
        <div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead >Sn.</TableHead>
                        <TableHead >Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Stipend (in Rs.)</TableHead>
                        <TableHead>Duration (in Days.)</TableHead>
                        <TableHead>Work Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Year of Study</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Session Half</TableHead>
                        <TableHead>Session Year</TableHead>
                        <TableHead>Offer Letter</TableHead>
                        <TableHead>Completion Certificate</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6">
                                <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-700" />
                                <span className="block text-sm text-gray-500 mt-2">Loading internships...</span>
                            </TableCell>
                        </TableRow>
                    ) : internships?.length > 0 ? (
                        internships.map((e, i) => (
                            <TableRow key={e?._id}>
                                <TableCell>{i + 1}.</TableCell>
                                <TableCell className="font-bold">{e?.companyName}</TableCell>
                                <TableCell>{e?.role}</TableCell>
                                <TableCell>{e?.stipend}</TableCell>
                                <TableCell>{e?.duration}</TableCell>
                                <TableCell>{e?.workType}</TableCell>
                                <TableCell>{e?.startDate}</TableCell>
                                <TableCell>{e?.endDate}</TableCell>
                                <TableCell>{e?.yearOfStudy}</TableCell>
                                <TableCell>{e?.semester}</TableCell>
                                <TableCell>{e?.sessionHalf}</TableCell>
                                <TableCell>{e?.sessionYear}</TableCell>
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

                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} className="text-center py-6 text-gray-500">
                                No internship records yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>


            </Table>
        </div>
    )
}

export default StudentPageInternshipDetails
