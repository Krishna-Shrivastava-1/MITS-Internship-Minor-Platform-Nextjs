"use client"

import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

const ContextApi = createContext(null)
export const ContextProvider = ({ children }) => {
    const [userIdFromToken, setuserIdFromToken] = useState([])
    const [fetchUserByIdState, setfetchUserByIdState] = useState([])
    const [nocResponseCount, setnocResponseCount] = useState([])
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        const fetchUserToken = async () => {
            try {
                const resp = await axios.get('/api/auth/user')
                // console.log(resp)
                setuserIdFromToken(resp?.data?.user)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchUserToken()
    }, [])

    // Fetch Logged In User data
    useEffect(() => {
  if (!userIdFromToken?.id) return; 

  const fetchUserById = async () => {
    try {
      const resp = await axios.get(`/api/auth/getuserbyid/${userIdFromToken.id}`);
      setfetchUserByIdState(resp.data.user);
    } catch (error) {
      console.log(error.message);
      // optional: auto-logout if token invalid
      setfetchUserByIdState(null)
      setuserIdFromToken(null);
      window.location.href ='/login'
    }
  }

  fetchUserById();
}, [userIdFromToken?.id]);



    // Logout Route
    const logout = async () => {
  try {
    await axios.post("/api/auth/logout"); // clears cookie server-side
    setfetchUserByIdState(null)
    toast.success("Logout Successfully")
      setuserIdFromToken(null);
      window.location.href ='/login'
  } catch (error) {
    console.log(error);
  }
};
// console.log(fetchUserByIdState?.assignedDepartmentForNocRequest)
//Fetch Noc Detail Responses Count
const fetchnocResponseCount = async () => {
  try {
    if(!fetchUserByIdState?.assignedDepartmentForNocRequest) return
    const resp = await axios.get(`/api/teacher/getcountofnocdetailsforcoordinator?dept=${fetchUserByIdState?.assignedDepartmentForNocRequest}`)
    if(resp?.data?.success){
      // console.log(resp?.data)
      setnocResponseCount(resp?.data)
    }
  } catch (error) {
    console.log(error?.message)
  }
}
useEffect(() => {
  if(userIdFromToken && fetchUserByIdState?.assignedDepartmentForNocRequest){
    fetchnocResponseCount()
  }
}, [userIdFromToken,fetchUserByIdState?.assignedDepartmentForNocRequest,pathname])




    return (
        <ContextApi.Provider value={{ fetchUserByIdState,logout ,userIdFromToken,nocResponseCount}}>
            {children}
        </ContextApi.Provider>
    )

}
export const DataProviderContextAPI = () => useContext(ContextApi)