'use client'
import React from 'react'
import { DataProviderContextAPI } from './ContextApi'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const NocDetailCountCards = () => {
    const {nocResponseCount,fetchUserByIdState} = DataProviderContextAPI()
    // console.log(nocResponseCount)
  return (
    <div>
      <h1 className='text-center font-bold text-3xl'>Hi, {fetchUserByIdState?.name}</h1>
      {fetchUserByIdState?.assignedDepartmentForNocRequest && (
         <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-green-200">
        <CardHeader>
          <CardDescription>You have Approved total NOC</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
         Total NOC Approved  {nocResponseCount?.totalNocDetailCountApprove}
          </CardTitle>
       
        </CardHeader>
       
      </Card>
      <Card className="@container/card bg-yellow-200">
        <CardHeader>
          <CardDescription>You have Pending total NOC</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
           Total NOC Pending       {nocResponseCount?.totalNocDetailCountPending}
          </CardTitle>
         
          
        </CardHeader>
       
      </Card>
      <Card className="@container/card bg-red-300">
        <CardHeader>
          <CardDescription>You have Rejected total NOC</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
           Total NOC Rejected       {nocResponseCount?.totalNocDetailCountReject}
          </CardTitle>
         
        </CardHeader>
      
      </Card>
      <Card className="@container/card bg-orange-200">
        <CardHeader>
          <CardDescription>You have Allowed Edit total NOC</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
           Total NOC Allowed Edit       {nocResponseCount?.totalNocDetailCountAllowEdit}
          </CardTitle>
        </CardHeader>
       
      </Card>
    </div>
    </div>
    </div>
      )}
        
    </div>
  )
}

export default NocDetailCountCards
