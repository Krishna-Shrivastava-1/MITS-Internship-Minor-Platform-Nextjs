'use client'
import { DepartmentSelectorforStudentRegister } from '@/components/DepartmentSelectorforStudentRegister'
import GoogleButton from '@/components/GoogleButton'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const [logger, setlogger] = useState('SignUp')
    const [name, setname] = useState('')
    const [enrollmentNumber, setenrollmentNumber] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [department, setdepartment] = useState('')
    const [loading, setloading] = useState(false)
      const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()


    const handleSignup = async (name, email, password, department, enrollmentNumber) => {
        try {
            setloading(true)
            const resp = await axios.post('/api/auth/register', {
                name, email, password, department, enrollmentNumber
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
                setlogger('Login')

            }
        } catch (error) {
            console.log(error.message)
             setloading(false)
        }
    }

    const handleLogin = async (email, password) => {
        try {
            setloading(true)
            const resp = await axios.post('/api/auth/login', {
                email, password
            }, {
                withCredentials: true // ✅ critical
            })

            // console.log('login - ',resp?.data)
            if (!resp?.data?.success) {
                setloading(false)
                toast.error(resp?.data?.message)
                // console.log((resp?.data?.message))

            }
            // console.log(resp?.data?.role)
            if (resp?.data?.success && resp?.data?.role === 'superadmin') {
                setloading(false)
                toast.success(resp?.data?.message)
                // console.log(resp?.data?.message)
                 window.location.href = '/superadmin'

                // setfetchedUserData(resp?.data)
            } else if (resp?.data?.success && resp?.data?.role === 'teacher') {
                setloading(false)
                toast.success(resp?.data?.message)
                // console.log(resp?.data?.message)
                // router.push('/admin')
                window.location.href = '/admin'
            } else if (resp?.data?.success && resp?.data?.role === 'student') {
                setloading(false)
                toast.success(resp?.data?.message)
                // console.log(resp?.data?.message)
                window.location.href = '/home'
            }

        } catch (error) {
            console.log(error.message)
             setloading(false)
        }
    }

    const handsubmit = async (e) => {
        e.preventDefault()
        if (logger === 'SignUp') {
            await handleSignup(name, email, password, department, enrollmentNumber)
        } else {
            await handleLogin(email, password)
        }
    }

    return (
        <div>
            <div className='absolute top-0 z-40 bg-black/30 backdrop-blur-sm w-full flex items-center'>
                <Navbar />
            </div>
            <div className='backban w-full h-screen bg-black flex items-center justify-center text-white '>

                <div className='z-30 md:w-[60%] w-[95%] text-center '>
                    <div className='w-full flex items-center justify-center ' style={{ margin: '4px' }}>
                        <div style={{ padding: '10px' }} className='md:w-[50%] w-[90%] bg-black/70  shadow-xl shadow-black rounded-sm backdrop-blur-lg relative'>
                            {
                                loading && <div className='absolute left-0 top-0 h-full w-full bg-black/45 flex items-center justify-center rounded-sm'>
                                    <Loader2 className='animate-spin' />
                                </div>
                            }

                            <h1 style={{ margin: '6px' }} className='text-xl font-extrabold'>{logger}</h1>
                            <form onSubmit={handsubmit} >
                                <div className='flex-wrap md:flex-nowrap gap-y-2 flex-col flex items-center  justify-center'>
                                    <div className='w-full'>
                                        {logger === 'SignUp' && <h2 className='text-left font-semibold'>Full Name</h2>}
                                        {
                                            logger === 'SignUp' && <input value={name} onChange={(e) => setname(e.target.value)} placeholder='Full name' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="text" className='outline-none  w-full bg-zinc-900/70 text-white text-lg focus-within:border border-red-500 rounded-md' />
                                        }
                                    </div>
                                    <div className='w-full'>
                                        {logger === 'SignUp' && <h2 className='text-left font-semibold'>Enrollment Number</h2>}
                                        {
                                            logger === 'SignUp' && <input value={enrollmentNumber} onChange={(e) => setenrollmentNumber(e.target.value)} placeholder='Enrollment Number' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="text" className='outline-none  w-full bg-zinc-900/70 text-white text-lg focus-within:border border-red-500 rounded-md' />
                                        }
                                    </div>
                                    <div className='w-full'>
                                        <h2 className='text-left font-semibold'>Email</h2>
                                        <input required value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email address' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="email" className='outline-none  w-full bg-zinc-900/70 text-white text-lg  focus-within:border border-red-500 rounded-md' />
                                    </div>
   <div className="relative w-full">
      <input
        required
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }}
        className="outline-none focus-within:border border-red-500 rounded-md w-full bg-zinc-900/70 text-white text-lg"
      />

      {/* Eye button */}
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div>
                                    {/* <div className='w-full'>
                                        <h2 className='text-left font-semibold'>Password</h2>
                                        <input required value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="password" className='outline-none focus-within:border border-red-500 rounded-md w-full bg-zinc-900/70 text-white text-lg ' />
                                    </div> */}
                                    {
                                        logger === 'SignUp' &&
                                        <div className='w-full flex items-center justify-start flex-wrap'>
                                            <h2 className='text-left font-semibold mr-2'>Select Department</h2>
                                            <DepartmentSelectorforStudentRegister getDepartmentValue={setdepartment} />
                                        </div>
                                    }


                                    {/* <div style={{ padding: '4px' }} className='text-nowrap bg-red-700 hover:bg-red-600 cursor-pointer select-none  '>Get Started</div> */}
                                </div>
                                {
                                    logger === 'SignUp' ?
                                        <p style={{ marginTop: '10px' }} className='text-left '>Already have an account? <span onClick={() => setlogger('Login')} className='hover:underline cursor-pointer select-none font-extrabold text-red-700'>Login</span></p>
                                        :
                                        <p style={{ marginTop: '10px' }} className='text-left '>Don't have an account? <span onClick={() => setlogger('SignUp')} className='hover:underline cursor-pointer select-none font-extrabold text-red-700'>SignUp</span></p>
                                }
                                {
                                    logger === 'SignUp' ? <button style={{ marginTop: '12px', padding: '5px' }} type='submit' className='bg-red-700 w-full hover:bg-red-600 cursor-pointer'>SignUp</button>
                                        :
                                        <button style={{ marginTop: '12px', padding: '5px' }} type='submit' className='bg-red-700 w-full hover:bg-red-600 cursor-pointer'>Login</button>
                                }

                            </form>
                            <div className='flex items-center justify-between w-full my-2'><div className='w-full h-[0.5px] bg-neutral-500'></div><span className='mx-2'>OR</span><div className='w-full h-[0.5px] bg-neutral-500'></div></div>
                           <div className='w-full flex items-center justify-center m-2'>
                             <GoogleButton />
                           </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default page
