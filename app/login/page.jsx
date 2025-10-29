'use client'
import { DepartmentSelectorforStudentRegister } from '@/components/DepartmentSelectorforStudentRegister'
import GoogleButton from '@/components/GoogleButton'
import Navbar from '@/components/Navbar'
import { ShineBorder } from '@/components/ui/shine-border'
import axios from 'axios'
import { ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
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
        // <div>
        //     <div className='absolute top-0 z-40  w-full flex items-center pl-4'>
        //         <h2 onClick={()=>router.push('/')} className='font-semibold mt-8 ml-3 text-white cursor-pointer select-none p-2 hover:bg-white/30 rounded-lg flex items-center '><ChevronLeft /> Back</h2>
        //     </div>
        //     <div className='backban w-full h-screen bg-black flex items-center justify-center  '>

        //         <div className='z-30 md:w-[60%] w-[95%] text-center '>
        //             <div className='w-full flex items-center justify-center ' style={{ margin: '4px' }}>
        //                 <div style={{ padding: '10px' }} className='md:w-lg w-[90%] bg-white  shadow-xl shadow-black rounded-lg backdrop-blur-lg relative'>
        //             <ShineBorder borderWidth={3} shineColor={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}  />
        //                     {
        //                         loading && <div className='absolute left-0 top-0 h-full w-full bg-black/45 flex items-center justify-center rounded-sm z-30'>
        //                             <Loader2 className='animate-spin' />
        //                         </div>
        //                     }

        //                     <h1 style={{ margin: '6px' }} className='text-xl font-extrabold'>{logger}</h1>
        //                     <form onSubmit={handsubmit} >
        //                         <div className='flex-wrap md:flex-nowrap gap-y-2 flex-col flex items-center  justify-center'>
        //                             <div className='w-full'>
        //                                 {logger === 'SignUp' && <h2 className='text-left font-semibold'>Full Name</h2>}
        //                                 {
        //                                     logger === 'SignUp' && <input value={name} onChange={(e) => setname(e.target.value)} placeholder='Full name' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="text" className='outline-none  w-full  text-lg bg-neutral-100 focus-within:border border-red-500 rounded-md' />
        //                                 }
        //                             </div>
        //                             <div className='w-full'>
        //                                 {logger === 'SignUp' && <h2 className='text-left font-semibold'>Enrollment Number</h2>}
        //                                 {
        //                                     logger === 'SignUp' && <input value={enrollmentNumber} onChange={(e) => setenrollmentNumber(e.target.value)} placeholder='Enrollment Number' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="text" className='outline-none  w-full bg-neutral-100 text-lg focus-within:border border-red-500 rounded-md' />
        //                                 }
        //                             </div>
        //                             <div className='w-full'>
        //                                 <h2 className='text-left font-semibold'>Email</h2>
        //                                 <input required value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email address' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="email" className='outline-none bg-neutral-100 w-full  text-lg  focus-within:border border-red-500 rounded-md' />
        //                             </div>
        //                             <div className="relative w-full">
        //                                 <h2 className='text-left font-semibold'>Password</h2>
        //                                 <input
        //                                     required
        //                                     value={password}
        //                                     onChange={(e) => setpassword(e.target.value)}
        //                                     placeholder="Password"
        //                                     type={showPassword ? "text" : "password"}
        //                                     style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }}
        //                                     className="outline-none bg-neutral-100 focus-within:border border-red-500 rounded-md w-full  text-lg"
        //                                 />

        //                                 {/* Eye button */}
        //                                 <span
        //                                     onClick={() => setShowPassword(!showPassword)}
        //                                     className="absolute right-3 top-[70%] select-none -translate-y-1/2 cursor-pointer text-gray-400"
        //                                 >
        //                                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        //                                 </span>
        //                             </div>
        //                             {/* <div className='w-full'>
        //                                 <h2 className='text-left font-semibold'>Password</h2>
        //                                 <input required value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' style={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px' }} type="password" className='outline-none focus-within:border border-red-500 rounded-md w-full bg-zinc-900/70 text-white text-lg ' />
        //                             </div> */}
        //                             {
        //                                 logger === 'SignUp' &&
        //                                 <div className='w-full flex items-center justify-start flex-wrap'>
        //                                     <h2 className='text-left font-semibold mr-2'>Select Department</h2>
        //                                     <DepartmentSelectorforStudentRegister settheme={'light'} getDepartmentValue={setdepartment} />
        //                                 </div>
        //                             }


        //                             {/* <div style={{ padding: '4px' }} className='text-nowrap bg-red-700 hover:bg-red-600 cursor-pointer select-none  '>Get Started</div> */}
        //                         </div>
        //                         {
        //                             logger === 'SignUp' ?
        //                                 <p style={{ marginTop: '10px' }} className='text-left '>Already have an account? <span onClick={() => setlogger('Login')} className='hover:underline cursor-pointer select-none font-extrabold text-red-700'>Login</span></p>
        //                                 :
        //                                 <p style={{ marginTop: '10px' }} className='text-left '>Don't have an account? <span onClick={() => setlogger('SignUp')} className='hover:underline cursor-pointer select-none font-extrabold text-red-700'>SignUp</span></p>
        //                         }
        //                         {
        //                             logger === 'SignUp' ? <button style={{ marginTop: '12px', padding: '5px' }} type='submit' className='bg-blue-600 w-full font-semibold text-white hover:bg-blue-500 cursor-pointer'>SignUp</button>
        //                                 :
        //                                 <button style={{ marginTop: '12px', padding: '5px' }} type='submit' className='bg-blue-600 w-full font-semibold text-white hover:bg-blue-500 cursor-pointer'>Login</button>
        //                         }

        //                     </form>
        //                     <div className='flex items-center justify-between w-full my-2'><div className='w-full h-[0.5px] bg-neutral-500'></div><span className='mx-2'>OR</span><div className='w-full h-[0.5px] bg-neutral-500'></div></div>
        //                     <div className='w-full flex items-center justify-center m-2'>
        //                         <GoogleButton />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>


        //     </div>
        // </div>
        <div>
  <div className="absolute top-0 z-40 w-full flex items-center pl-4">
   <h2
  onClick={() => router.push('/')}
  className="font-semibold mt-8 ml-3 text-white cursor-pointer select-none p-2 hover:bg-white/20 rounded-lg flex items-center transition-colors"
>
  <ChevronLeft className="mr-1" /> Back
</h2>

  </div>

  <div className="backban w-full h-screen bg-card flex items-center justify-center">
    <div className="z-30 md:w-[60%] w-[95%] text-center">
      <div className="w-full flex items-center justify-center m-1">
        <div
          className="md:w-lg w-[90%] bg-card shadow-xl shadow-border rounded-lg backdrop-blur-lg relative p-4"
        >
          <ShineBorder
            borderWidth={3}
            shineColor={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}
          />

          {loading && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center rounded-sm z-30">
              <Loader2 className="animate-spin text-primary" />
            </div>
          )}

          <h1 className="text-xl font-extrabold mb-2 text-foreground">{logger}</h1>

          <form onSubmit={handsubmit}>
            <div className="flex-wrap md:flex-nowrap gap-y-2 flex-col flex items-center justify-center">
              {logger === 'SignUp' && (
                <>
                  <div className="w-full">
                    <h2 className="text-left font-semibold text-foreground">Full Name</h2>
                    <input
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Full name"
                      type="text"
                      className="outline-none w-full text-lg bg-input text-foreground border border-border rounded-md px-3 py-1 focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="w-full">
                    <h2 className="text-left font-semibold text-foreground">Enrollment Number</h2>
                    <input
                      value={enrollmentNumber}
                      onChange={(e) => setenrollmentNumber(e.target.value)}
                      placeholder="Enrollment Number"
                      type="text"
                      className="outline-none w-full text-lg bg-input text-foreground border border-border rounded-md px-3 py-1 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </>
              )}

              <div className="w-full">
                <h2 className="text-left font-semibold text-foreground">Email</h2>
                <input
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email address"
                  type="email"
                  className="outline-none w-full text-lg bg-input text-foreground border border-border rounded-md px-3 py-1 focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative w-full">
                <h2 className="text-left font-semibold text-foreground">Password</h2>
                <input
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  className="outline-none w-full text-lg bg-input text-foreground border border-border rounded-md px-3 py-1 focus:ring-2 focus:ring-primary"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[70%] -translate-y-1/2 cursor-pointer text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              {logger === 'SignUp' && (
                <div className="w-full flex items-center justify-start flex-wrap">
                  <h2 className="text-left font-semibold mr-2 text-foreground">
                    Select Department
                  </h2>
                  <DepartmentSelectorforStudentRegister
                    // settheme="light"
                    getDepartmentValue={setdepartment}
                  />
                </div>
              )}
            </div>

            {logger === 'SignUp' ? (
              <p className="mt-2 text-left text-muted-foreground">
                Already have an account?{' '}
                <span
                  onClick={() => setlogger('Login')}
                  className="hover:underline cursor-pointer font-extrabold text-primary"
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="mt-2 text-left text-muted-foreground">
                Don't have an account?{' '}
                <span
                  onClick={() => setlogger('SignUp')}
                  className="hover:underline cursor-pointer font-extrabold text-primary"
                >
                  SignUp
                </span>
              </p>
            )}

            <button
              type="submit"
              className="mt-3 py-2 w-full bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition"
            >
              {logger === 'SignUp' ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="flex items-center justify-between w-full my-3">
            <div className="w-full h-[1px] bg-border"></div>
            <span className="mx-2 text-muted-foreground">OR</span>
            <div className="w-full h-[1px] bg-border"></div>
          </div>

          <div className="w-full flex items-center justify-center m-2">
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
