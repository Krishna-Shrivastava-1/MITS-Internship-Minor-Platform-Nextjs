'use client'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'
const AccordionLandingPage = () => {
  return (
    <div className='my-3'>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0">
                <Image
                    className="max-w-sm w-full rounded-xl h-auto"
                    src="https://web.mitsgwalior.in/images/mits-logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                />
                <div>
                    <p className="text-indigo-600 text-sm font-medium">FAQ's</p>
                    <h1 className="text-3xl font-semibold">Looking for answer?</h1>
                    <p className="text-sm text-slate-500 mt-2 pb-4">
                       Let you Doubts Resolve?
                    </p>
     <Accordion
  type="single"
  collapsible
  className="w-[320px] md:w-lg"
  defaultValue="item-1"
>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is MITS-DU NOC Portal?</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
      <p>
        The MITS-DU NOC Portal is a centralized platform for students to apply for No Objection Certificates (NOCs) efficiently. It allows submission, tracking, and management of all NOC-related documents in one place.
      </p>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>How do I apply for a NOC?</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
      <p>
        Students can apply for a NOC by filling out the application form and uploading the necessary documents such as offer letters or completion certificates. Once submitted, the request is routed to the concerned teacher for approval.
      </p>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>How will I know when my NOC is approved?</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
      <p>
        Once your NOC is approved, the system automatically sends a notification email with the approved NOC PDF. You can also track the status directly in your dashboard.
      </p>
    </AccordionContent>
  </AccordionItem>

  {/* <AccordionItem value="item-4">
    <AccordionTrigger>Can I access my documents anytime?</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
      <p>
        Yes! All uploaded and approved documents, including offer letters, completion certificates, and NOCs, are securely stored and can be accessed anytime through your student dashboard.
      </p>
    </AccordionContent>
  </AccordionItem> */}

  <AccordionItem value="item-5">
    <AccordionTrigger>Is my data secure?</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
      <p>
        Absolutely. The portal uses secure authentication and cloud storage policies to ensure that all student documents and personal information remain private and protected.
      </p>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-6">
    <AccordionTrigger>What if I face issues using the portal?</AccordionTrigger>
    <AccordionContent className="flex flex-col gap-4 text-balance">
      <p>
        For any technical or NOC-related issues, students can contact the support team via the portal. Our team ensures prompt assistance and resolution of your concerns.
      </p>
    </AccordionContent>
  </AccordionItem>
</Accordion>

    </div>
    </div>
    </div>
  )
}

export default AccordionLandingPage
