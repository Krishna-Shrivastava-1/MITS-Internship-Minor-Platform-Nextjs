'use client'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { DataProviderContextAPI } from '@/components/ContextApi'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import PdfUploader from '@/components/PdfUploader'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
import { Spinner } from '@/components/ui/spinner'

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
  // const [completionCertificate, setCompletionCertificate] = useState('')
  const [workType, setWorkType] = useState('')
  const [role, setrole] = useState('')
  const [jobDescription, setjobDescription] = useState('')
  const [department, setdepartment] = useState(fetchUserByIdState?.department || '')
  const [enrollmentNumber, setenrollmentNumber] = useState(fetchUserByIdState?.enrollmentNumber || '')
  const [recieverName, setrecieverName] = useState('')
  const [recieverDesignation, setrecieverDesignation] = useState('')
  const [loading, setloading] = useState(false)
   const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (fetchUserByIdState?.department) {
      setdepartment(fetchUserByIdState?.department)
      setenrollmentNumber(fetchUserByIdState?.enrollmentNumber)
    }
  }, [fetchUserByIdState])
  const handleChange = (e)=>{
    setFile(e?.target?.files[0])
  }
    const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a PDF first')
      return
    }

    setUploading(true)

    const filePath = `pdfs/${Date.now()}_${file.name}`

    const { data, error } = await supabase.storage
      .from('offerletters') //  bucket name
      .upload(filePath, file)

    setUploading(false)

    if (error) {
      console.error(error)
      toast.error('Upload failed')
      return
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('offerletters')
      .getPublicUrl(filePath)

    // setOfferLetter(publicUrlData.publicUrl)
    // console.log('offer leter url state ',publicUrlData.publicUrl)
    return publicUrlData.publicUrl
    // toast.success('File uploaded successfully!')
  }
  // console.log(enrollmentNumber)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
     if(!file){
      toast.error("Offer Letter is Not Selected");
      setloading(false);
      return;
    }

    // Upload file and get URL directly
    const uploadedUrl = await handleUpload();

    if (!uploadedUrl) {
      toast.error("File Upload failed");
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
        offerLetter:uploadedUrl,
        // completionCertificate,
        workType,
        role,
        jobDescription,
        department,
        enrollmentNumber,
        recieverName,
        recieverDesignation
      }
      const resp = await axios.post(`/api/student/createnocrequest/${userIdFromToken?.id}`, payload)
      // console.log('Submitting:', payload)
      if (resp?.data?.success) {
        
        setloading(false)
        toast.success(resp?.data?.message)
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
        // setCompletionCertificate('')
        setWorkType('')
        setrole('')
        setjobDescription('')
        setrecieverDesignation('')
        setrecieverName('')
        setFile(null)
      }
    } catch (error) {
      toast.error("Error in Request Generation")
      console.log(error)
      setloading(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const year = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i)
  return (
   <div
  className="
    max-w-3xl mx-auto p-6 my-6 rounded-md relative z-10
    border border-[var(--border)]
     shadow-[var(--shadow-color)]
    bg-[var(--card)]
    text-[var(--card-foreground)]
  "
>
  {loading && (
    <div className="w-full absolute top-0 left-0 flex items-center justify-center bg-[var(--background)]/50 h-full backdrop-blur-sm">
      <Spinner />
    </div>
  )}

  <h1 className="text-2xl font-bold mb-6">NOC Application Details</h1>

  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block mb-1 text-[var(--foreground)]">Company Name</label>
      <Input
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
       className='border-black'
      />
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
          <Input  type='file' accept='application/pdf' onChange={handleChange} required />
        </div>

        {/* <div>
          <label>Completion Certificate (URL)</label>
          <Input value={completionCertificate} onChange={(e) => setCompletionCertificate(e.target.value)} required />
        </div> */}


        <div>
          <label>Role in Company</label>
          <Input value={role} className='border-black' onChange={(e) => setrole(e.target.value)} required />
        </div>
        <div>

          <label>Job Description</label>
          <Textarea value={jobDescription} className='border-black ' onChange={(e) => setjobDescription(e.target.value)} required />
        </div>
        <div>
          <label>Reciever Name <p>Note: That Person name who is want to check NOC certificate from your Company</p></label>
          <Input value={recieverName} className='border-black' onChange={(e) => setrecieverName(e.target.value)} required />
        </div>
        <div>
          <label>Reciever Designation <p>Note: That Person's Designation who is want to check NOC certificate from your Company</p></label>
          <Input value={recieverDesignation} className='border-black' onChange={(e) => setrecieverDesignation(e.target.value)} required />
        </div>
        <div></div>
        <div className='w-full flex items-center justify-center'>
          <Button className='w-full cursor-pointer select-none font-semibold' type="submit">Submit</Button>
        </div>
      </form>
    
    </div>
  )
}

export default page
