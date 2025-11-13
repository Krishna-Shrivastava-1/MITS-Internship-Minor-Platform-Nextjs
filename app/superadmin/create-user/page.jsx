'use client'
import { DataProviderContextAPI } from '@/components/ContextApi'
import { DepartmentSelectorforStudentRegister } from '@/components/DepartmentSelectorforStudentRegister'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

const page = () => {
  const { fetchUserByIdState } = DataProviderContextAPI()
  // console.log(fetchUserByIdState)
  const [logger, setlogger] = useState('SignUp')
  const [name, setname] = useState('')
  const [enrollmentNumber, setenrollmentNumber] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [department, setdepartment] = useState('')
  const [loading, setloading] = useState(false)
const [role, setrole] = useState("student")

  const handleSignup = async (name, email, password, department, enrollmentNumber,role) => {
    try {
      setloading(true)
      const resp = await axios.post('/api/auth/register', {
        name, email, password, department, enrollmentNumber,role
      })
      // console.log('register - ',resp)

      if (!resp?.data?.success) {
        toast.error(resp?.data?.message)
         setloading(false)
        // console.log(resp?.data?.message)

      }
      if (resp?.data?.success) {
        toast.success(resp?.data?.message)
        setloading(false)
        // console.log((resp?.data?.message))
      setname('')
      setemail('')
      setpassword('')
      setdepartment('')
      setenrollmentNumber('')
      setrole('student')
      }
    } catch (error) {
       setloading(false)
      console.log(error.message)
    }
  }
  const handsubmit = async (e) => {
    e.preventDefault()
    if (logger === 'SignUp') {
      await handleSignup(name, email, password, department, enrollmentNumber,role)
    }
  }
  const handlevalueChange = (e)=>{
    setrole(e)

  }
  // console.log(role)
  // console.log(department)
  return (
    <div>
      <h1 className='text-center'>If you are creating teacher account no need to enter enrollment number.</h1>
      <div className='w-full h-full flex items-center justify-center'>

        <div className='z-30 md:w-3xl w-[90%] text-center '>
          <div className='w-full flex items-center justify-center ' style={{ margin: '4px' }}>
            <div style={{ padding: '10px' }} className='md:w-[50%] w-[90%] border  shadow-xl shadow-black rounded-sm backdrop-blur-lg relative'>
              {
                loading && <div className='absolute left-0 top-0 h-full w-full bg-white/45 flex items-center justify-center rounded-sm'>
                  <Loader2 className='animate-spin' />
                </div>
              }

              <h1 style={{ margin: '6px' }} className='text-xl font-extrabold'>{logger}</h1>
              <form onSubmit={handsubmit} >
                <div className='flex-wrap md:flex-nowrap gap-y-2 flex-col flex items-center  justify-center'>
                  <div className='w-full'>
                    {logger === 'SignUp' && <h2 className='text-left font-semibold'>Full Name</h2>}
                    {
                      logger === 'SignUp' && <input value={name} onChange={(e) => setname(e.target.value)} placeholder='Full name' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="text" className='outline-none  w-full  text-lg focus-within:border border-red-500 rounded-md' />
                    }
                  </div>
                  <div className='w-full'>
                    {logger === 'SignUp' && <h2 className='text-left font-semibold'>Enrollment Number</h2>}
                    {
                      logger === 'SignUp' && <input value={enrollmentNumber} onChange={(e) => setenrollmentNumber(e.target.value)} placeholder='Enrollment Number' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="text" className='outline-none  w-full  text-lg focus-within:border border-red-500 rounded-md' />
                    }
                  </div>
                  <div className='w-full'>
                    <h2 className='text-left font-semibold'>Email</h2>
                    <input required value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email address' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="email" className='outline-none  w-full  text-lg  focus-within:border border-red-500 rounded-md' />
                  </div>

                  <div className='w-full'>
                    <h2 className='text-left font-semibold'>Password</h2>
                    <input required value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="password" className='outline-none focus-within:border border-red-500 rounded-md w-full  text-lg ' />
                  </div>
                  {
                    logger === 'SignUp' &&
                    <div className='w-full flex items-center justify-start flex-wrap my-2'>
                      <h2 className='text-left font-semibold mr-2'>Select Department</h2>
                      <DepartmentSelectorforStudentRegister getDepartmentValue={setdepartment} settheme={"light"} />
                    </div>
                  }


                  {/* <div style={{ padding: '4px' }} className='text-nowrap bg-red-700 hover:bg-red-600 cursor-pointer select-none  '>Get Started</div> */}
                </div>
                <RadioGroup className='flex items-center justify-around' onValueChange={handlevalueChange} value={role}>
                  <div className="flex items-center space-x-2 text-xl font-semibold">
                    <RadioGroupItem  value="student" id="student" />
                    <Label className='font-semibold' htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2 text-xl font-semibold">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label  className='font-semibold' htmlFor="teacher">Teacher</Label>
                  </div>
                </RadioGroup>
                {/* {
                                          logger === 'SignUp' ?
                                              <p style={{ marginTop: '10px' }} className='text-left '>Already have an account? <span onClick={() => setlogger('Login')} className='hover:underline cursor-pointer select-none font-extrabold text-red-700'>Login</span></p>
                                              :
                                              <p style={{ marginTop: '10px' }} className='text-left '>Don't have an account? <span onClick={() => setlogger('SignUp')} className='hover:underline cursor-pointer select-none font-extrabold text-red-700'>SignUp</span></p>
                                      } */}
                {
                  logger === 'SignUp' && <button style={{ marginTop: '12px', padding: '5px' }} type='submit' className='bg-red-700 w-full hover:bg-red-600 text-white cursor-pointer'>Create Account</button>
                  
                }

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
