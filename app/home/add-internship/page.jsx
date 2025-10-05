'use client'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { DataProviderContextAPI } from '@/components/ContextApi'
const page = () => {
  const { userIdFromToken, fetchUserByIdState } = DataProviderContextAPI()
  // console.log(fetchUserByIdState)
  const [companyName, setCompanyName] = useState('')
  const [yearOfStudy, setYearOfStudy] = useState('')
  const [semester, setSemester] = useState('')
  const [sessionHalf, setSessionHalf] = useState('')
  const [sessionYear, setSessionYear] = useState('')
  const [duration, setDuration] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [stipend, setStipend] = useState('')
  const [offerLetter, setOfferLetter] = useState('')
  const [completionCertificate, setCompletionCertificate] = useState('')
  const [workType, setWorkType] = useState('')
  const [role, setrole] = useState('')
  const [jobDescription, setjobDescription] = useState('')
  const [department, setdepartment] = useState(fetchUserByIdState?.department || '')
  useEffect(() => {
    if (fetchUserByIdState?.department) {
      setdepartment(fetchUserByIdState?.department)
    }
  }, [fetchUserByIdState])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const validSemesters = {
        1: [1, 2],
        2: [3, 4],
        3: [5, 6],
        4: [7, 8]
      };

      if (!validSemesters[yearOfStudy]?.includes(Number(semester))) {
        return console.log("Enter Year and Semester Consistently");
      }
      const payload = {
        companyName,
        yearOfStudy,
        semester: Number(semester),
        sessionHalf,
        sessionYear: Number(sessionYear),
        duration: Number(duration),
        location,
        startDate,
        endDate,
        stipend: Number(stipend),
        offerLetter,
        completionCertificate,
        workType,
        role,
        jobDescription,
        department
      }
      const resp = await axios.post(`/api/student/createinternship/${userIdFromToken?.id}`, payload)
      console.log('Submitting:', payload)
      if (resp?.data?.success) {
        console.log(resp?.data?.message)
        console.log(resp?.data)
        setCompanyName('')
        setYearOfStudy('')
        setSemester('')
        setSessionHalf('')
        setSessionYear('')
        setDuration('')
        setLocation('')
        setStartDate('')
        setEndDate('')
        setStipend('')
        // setOfferLetter('')
        // setCompletionCertificate('')
        setWorkType('')
        setrole('')
        setjobDescription('')

      }
    } catch (error) {
      console.log(error)
    }
  }
  const currentYear = new Date().getFullYear()
  const year = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i)
  return (
    <div className="max-w-3xl mx-auto p-6 border shadow-xl rounded-md shadow-black my-3 ">
      <h1 className="text-2xl font-bold mb-6">Add Internship Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Company Name</label>
          <Input value={companyName} className='border-black' onChange={(e) => setCompanyName(e.target.value)} required />
        </div>

        <div className="flex gap-4 flex-wrap">
          <div>
            <label>Year of Study</label>
            <Select value={yearOfStudy} onValueChange={setYearOfStudy}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label>Semester</label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <SelectItem key={s} value={String(s)}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label>Session Half</label>
            <Select value={sessionHalf} onValueChange={setSessionHalf}>
              <SelectTrigger>
                <SelectValue placeholder="Select Session Half" />
              </SelectTrigger>
              <SelectContent>
                {["Jan-Jun", "Jul-Dec"].map(sh => <SelectItem key={sh} value={sh}>{sh}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Session Year</label>
            <Select value={sessionYear} onValueChange={setSessionYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select Session Year" />
              </SelectTrigger>
              <SelectContent>
                {year.map(sh => <SelectItem key={sh} value={String(sh)}>{sh}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* <div>
          <label>Session Year</label>
          <Input type="number" value={sessionYear} onChange={(e) => setSessionYear(e.target.value)} required />
        </div> */}

        <div>
          <label>Duration (in Days)</label>
          <Input className='border-black' type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>

        <div>
          <label>Location</label>
          <Input className='border-black' value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div className="flex gap-4 flex-wrap">
          <div>
            <label>Start Date</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label>End Date</label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div>
            <label>Work Type</label>
            <Select value={workType} onValueChange={setWorkType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Work Type" />
              </SelectTrigger>
              <SelectContent>
                {['Remote', 'Hybrid', 'Onsite'].map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label>Stipend (in Rs.)</label>
          <Input className='border-black' type="number" value={stipend} onChange={(e) => setStipend(e.target.value)} />
        </div>

        {/* <div>
          <label>Offer Letter (URL)</label>
          <Input value={offerLetter} onChange={(e) => setOfferLetter(e.target.value)} required />
        </div>

        <div>
          <label>Completion Certificate (URL)</label>
          <Input value={completionCertificate} onChange={(e) => setCompletionCertificate(e.target.value)} required />
        </div> */}


        <div>
          <label>Role in Company</label>
          <Input value={role} className='border-black' onChange={(e) => setrole(e.target.value)} required />
        </div>
        <div>
          <label>Job Description</label>
          <Input value={jobDescription} className='border-black' onChange={(e) => setjobDescription(e.target.value)} required />
        </div>
        <div className='w-full flex items-center justify-center'>
          <Button className='w-full cursor-pointer select-none font-semibold' type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default page
