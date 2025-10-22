'use client'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { DataProviderContextAPI } from '@/components/ContextApi'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'
const page = () => {
    const {id}  =useParams()
    const router = useRouter()
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
  const [enrollmentNumber, setenrollmentNumber] = useState(fetchUserByIdState?.enrollmentNumber || '')
  const [recieverName, setrecieverName] = useState('')
  const [recieverDesignation, setrecieverDesignation] = useState('')
  const [teacherAction, setteacherAction] = useState('')
  const [loading, setloading] = useState(false)
   const [file, setFile] = useState(null)
      const [uploading, setUploading] = useState(false)
      const [comment, setcomment] = useState('')
  useEffect(() => {
    if (fetchUserByIdState?.department) {
      setdepartment(fetchUserByIdState?.department)
      setenrollmentNumber(fetchUserByIdState?.enrollmentNumber)
    }
  }, [fetchUserByIdState])

  const getNocOldData = async()=>{
try {
    if(!id) return
    const resp  =await axios.get(`/api/nocrequests/getnocrequestbyid/${id}`)
    if(resp?.data?.success){
         
        console.log(resp?.data)
        // console.log(resp?.data?.nocRequestData?.offerLetter)
        setCompanyName(resp?.data?.nocRequestData?.companyName)
        setYearOfStudy(resp?.data?.nocRequestData?.yearOfStudy)
        setSemester(resp?.data?.nocRequestData?.semester)
        setSessionHalf(resp?.data?.nocRequestData?.sessionHalf)
        setSessionYear(resp?.data?.nocRequestData?.sessionYear)
        setDuration(resp?.data?.nocRequestData?.duration)
        setLocation(resp?.data?.nocRequestData?.location)
        setStartDate(resp?.data?.nocRequestData?.startDate)
        setEndDate(resp?.data?.nocRequestData?.endDate)
        setStipend(resp?.data?.nocRequestData?.stipend)
        setOfferLetter(resp?.data?.nocRequestData?.offerLetter)
        // setCompletionCertificate('')
        setWorkType(resp?.data?.nocRequestData?.workType)
        setrole(resp?.data?.nocRequestData?.role)
        setjobDescription(resp?.data?.nocRequestData?.jobDescription)
        setrecieverDesignation(resp?.data?.nocRequestData?.recieverDesignation)
        setrecieverName(resp?.data?.nocRequestData?.recieverName)
       setteacherAction(resp?.data?.nocRequestData?.teacherAction)
       setcomment(resp?.data?.nocRequestData?.comment)
    }
    
    // if(teacherAction !== "Allow Edit"){
    //     router.back()
    // }
} catch (error) {
    console.log(error?.message)
}

  }
  useEffect(() => {
   if(id){
    getNocOldData()
   }
  }, [id])
  // console.log(offerLetter)
  // console.log(comment)
    const handleChange = (e)=>{
    setFile(e?.target?.files[0])
  }
  const handleUpload = async () => {
  if (!file) {
    toast.error('Please select a PDF first');
    return;
  }

  setUploading(true);

  try {
    // Step 1: Delete old file if it exists
    if (offerLetter) {
      // Convert public URL to storage path
      const url = new URL(offerLetter);
      // Example: https://xyz.supabase.co/storage/v1/object/public/offerletters/pdfs/123.pdf
      // We want: "pdfs/123.pdf"
      // console.log('url - ',url)
      const pathParts = url.pathname.split('/');
      // console.log('pathParts', pathParts)
      const filePath = pathParts.slice(6).join('/'); // skip: /storage/v1/object/public/offerletters/
// console.log('filePath',filePath)
const { data: list } = await supabase.storage.from('offerletters').list('pdfs')
// console.log('lists',list) // make sure the file exists exactly at that path

      if (filePath) {
        const { error: delError } = await supabase.storage
          .from('offerletters')
          .remove([filePath]);

        if (delError) console.error('Error deleting old file:', delError);
      }
    }

    // Step 2: Upload new file
    const newFilePath = `pdfs/${Date.now()}_${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from('offerletters')
      .upload(newFilePath, file);

    if (uploadError) {
      // console.error(uploadError);
      toast.error('Upload failed');
      return;
    }

    // Step 3: Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('offerletters')
      .getPublicUrl(newFilePath);

    setOfferLetter(publicUrlData.publicUrl); // update state
    toast.success('File uploaded successfully!');
    return publicUrlData.publicUrl;
  } finally {
    setUploading(false);
  }
};

useEffect(() => {
   if(teacherAction&&teacherAction !== 'Allow Edit'){
        router.back()
      }
}, [teacherAction])



  const handleSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
         if(!file && !offerLetter){
      toast.error("Offer Letter is Not Selected");
      setloading(false);
      return;
    }
   let uploadedUrl;

// If there’s no existing offer letter, upload a new file
if (!offerLetter) {
  uploadedUrl = await handleUpload();

  if (!uploadedUrl) {
    toast.error("File Upload failed");
    setloading(false);
    return;
  }
} else {
  // If offerLetter already exists, use it
  uploadedUrl = offerLetter;
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
     
    //    console.log(teacherAction)
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
        recieverDesignation,
        teacherAction:teacherAction
      }
      const resp = await axios.put(`/api/student/editnocrequest/${id}`, payload)
    //   console.log('Submitting:', payload)
      if (resp?.data?.success) {
        setloading(false)
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
        router.back()
      }
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }
// console.log('offer letter '+offerLetter)
  const currentYear = new Date().getFullYear()
  const year = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i)
  return (
    <div className="max-w-3xl mx-auto p-6 border shadow-xl rounded-md shadow-black my-3 relative z-10">
    {loading &&   <div className='w-full absolute top-0 left-0 flex items-center justify-center bg-white/20 h-full'> <Spinner className='size-6 text-black'/></div>}
    {comment && (<div className='border rounded-md p-3'><h1 className='font-semibold text-lg'>Teacher Comment :-</h1><p>{comment}</p></div>)}
      <h1 className="text-2xl font-bold mb-6">Edit NOC Application Details</h1>
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
            {
              offerLetter ?
              <div className='border rounde-lg '><a className='text-blue-700 hover:underline' href={offerLetter} target="_blank" rel="noopener noreferrer">View</a>
              <div className='flex items-center gap-x-4'>
                <p className=''>Wanted to Remove this File?</p>
                <Button onClick={()=>setOfferLetter('')} variant={'destructive'}>Delete</Button>
              </div>
              </div>
              :
              
              <Input  type='file' accept='application/pdf' onChange={handleChange} required />
            }
                 
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
        {
            loading ? 
             <div className='w-full flex items-center justify-center'>
          <Button className='w-full cursor-pointer select-none font-semibold' > Submit</Button>
        </div>
        :
         <div className='w-full flex items-center justify-center'>
          <Button className='w-full cursor-pointer select-none font-semibold' type="submit">Submit</Button>
        </div>
        }
        {/* <div className='w-full flex items-center justify-center'>
          <Button className='w-full cursor-pointer select-none font-semibold' type="submit">Submit</Button>
        </div> */}
      </form>
    </div>
  )
}

export default page
