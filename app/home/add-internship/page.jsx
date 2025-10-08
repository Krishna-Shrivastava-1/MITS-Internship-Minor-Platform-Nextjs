'use client'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { DataProviderContextAPI } from '@/components/ContextApi'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { Spinner } from '@/components/ui/spinner'
import { mutate } from 'swr'
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
     const [offerFile, setofferFile] = useState(null)
     const [completionCertificateFile, setcompletionCertificateFile] = useState(null)
     const [loading, setloading] = useState(false)
   const handleOfferLetterChange = (e)=>{
    setofferFile(e?.target?.files[0])

  }
   const handleCompletionCertificateChange = (e)=>{

    setcompletionCertificateFile(e?.target?.files[0])
  }



  useEffect(() => {
    if (fetchUserByIdState?.department) {
      setdepartment(fetchUserByIdState?.department)
    }
  }, [fetchUserByIdState])


// Offer Letter Upload Function
    const handleOfferLetterUpload = async () => {
    if (!offerFile) {
      toast.error('Please select a PDF first')
      return
    }

   

    const filePath = `pdfs/${Date.now()}_${offerFile.name}`

    const { data, error } = await supabase.storage
      .from('internshipofferletters') //  bucket name
      .upload(filePath, offerFile)

    

    if (error) {
      console.error(error)
      toast.error('Upload failed')
      return
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('internshipofferletters')
      .getPublicUrl(filePath)

    // setOfferLetter(publicUrlData.publicUrl)
    // console.log('offer leter url state ',publicUrlData.publicUrl)
    return publicUrlData.publicUrl
    // toast.success('File uploaded successfully!')
  }
// Completion Letter Upload Function
    const handleCompletionLetterUpload = async () => {
    if (!completionCertificateFile) {
      toast.error('Please select a PDF first')
      return
    }

   

    const filePath = `pdfs/${Date.now()}_${completionCertificateFile.name}`

    const { data, error } = await supabase.storage
      .from('internshipcompletionletters') //  bucket name
      .upload(filePath, completionCertificateFile)

    

    if (error) {
      console.error(error)
      toast.error('Upload failed')
      return
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('internshipcompletionletters')
      .getPublicUrl(filePath)

    // setOfferLetter(publicUrlData.publicUrl)
    // console.log('offer leter url state ',publicUrlData.publicUrl)
    return publicUrlData.publicUrl
    // toast.success('File uploaded successfully!')
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
        setloading(true)
    try {
       if(!offerFile){
      toast.error("Offer Letter is Not Selected");
      setloading(false);
      return;
    }
       if(!completionCertificateFile){
      toast.error("Completion Certificate is Not Selected");
      setloading(false);
      return;
    }

    // Upload file and get URL directly
    const uploadedOfferLetterUrl = await handleOfferLetterUpload();
const uploadedCompletionCertificateUrl = await handleCompletionLetterUpload()
      if (!uploadedOfferLetterUrl) {
      toast.error("Offer Letter File Upload failed");
      setloading(false);
      return;
    }
      if (!uploadedCompletionCertificateUrl) {
      toast.error("Completion Letter File Upload failed");
      setloading(false);
      return;
    }

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
        offerLetter:uploadedOfferLetterUrl,
        completionCertificate:uploadedCompletionCertificateUrl,
        workType,
        role,
        jobDescription,
        department
      }
      const resp = await axios.post(`/api/student/createinternship/${userIdFromToken?.id}`, payload)
      // console.log('Submitting:', payload)
       setloading(false);
      if (resp?.data?.success) {
        toast.success(resp?.data?.message)
        mutate(`/api/student/getinternshipdetailsofstudentbyid/${userIdFromToken?.id}`)
        // console.log(resp?.data?.message)
        // console.log(resp?.data)
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
        setOfferLetter('')
        setCompletionCertificate('')
        setWorkType('')
        setrole('')
        setjobDescription('')

      }
    } catch (error) {
      toast.error("There is some issue but not your fault")
       setloading(false);
      console.log(error)
    }
  }
  const currentYear = new Date().getFullYear()
  const year = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i)
  return (
     <div className="max-w-3xl mx-auto p-6 border shadow-xl rounded-md shadow-black my-3 relative z-10">
     {loading &&   <div className='w-full absolute top-0 left-0 flex items-center justify-center bg-white/20 h-full'> <Spinner /></div>}
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
<div className='w-fit'>
          <label>Offer Letter (PDF)</label>
          <Input  type='file' accept='application/pdf' onChange={handleOfferLetterChange} required />
        </div>
<div className='w-fit'>
          <label>Completion Certificate (PDF)</label>
          <Input  type='file' accept='application/pdf' onChange={handleCompletionCertificateChange} required />
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
