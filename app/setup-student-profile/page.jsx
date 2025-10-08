'use client'
import { DataProviderContextAPI } from '@/components/ContextApi';
import { DepartmentSelectorforStudentRegister } from '@/components/DepartmentSelectorforStudentRegister';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const router = useRouter();
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [department, setDepartment] = useState("");
  const {fetchUserByIdState,userIdFromToken} = DataProviderContextAPI()
  useEffect(() => {
    // If no user data (no token), redirect to login
    if (!fetchUserByIdState || !userIdFromToken) {
      router.replace("/login"); // or your login page
      return;
    }

    // If user already has enrollmentNumber & department, redirect to home
    if (
      fetchUserByIdState?.enrollmentNumber?.trim() &&
      fetchUserByIdState?.department?.trim()
      && fetchUserByIdState?.role === 'student'
    ) {
      router.replace("/home");
    }
  }, [fetchUserByIdState, router,userIdFromToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!enrollmentNumber || !department) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const resp = await axios.put("/api/student/setup-profile", {
        enrollmentNumber,
        department,
      });
      if (resp?.data?.success) {
        toast.success("Profile updated successfully!");
        router.push("/home");
      }
      if (!resp?.data?.success) {
        toast.error(resp?.data?.message);
       
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-xl">
      <h1 className="text-xl font-bold mb-4">Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Enrollment Number</label>
          <input
            type="text"
            value={enrollmentNumber}
            onChange={(e) => setEnrollmentNumber(e.target.value.toLowerCase())}
            className="w-full border p-2 rounded"
            placeholder='Enter Enrollment Number'
          />
        </div>
        <div className="mb-4">
          <label className='mr-2'>Department</label>
            <DepartmentSelectorforStudentRegister getDepartmentValue={setDepartment} settheme={"light"} />
          
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer select-none"
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default page
