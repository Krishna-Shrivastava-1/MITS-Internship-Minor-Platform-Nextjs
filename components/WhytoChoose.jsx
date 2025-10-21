"use client";

import { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";

import { LucideIcon, BookOpen, Bell, UserCheck, Star, UserRound } from "lucide-react"; // Example icons
import { AnimatedBeam } from "./ui/animated-beam";
import { AnimatedGridPattern } from "./ui/animated-grid-pattern";

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex w-12 h-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function AnimatedBeamDemo() {
  const containerRef = useRef(null);

  // Student node
  const studentRef = useRef(null);

  // Advantage nodes
  const advRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const advantages = [
    { title: "Easy Start", icon: BookOpen },
    { title: "Stay Updated", icon: Bell },
    { title: "Verified Application", icon: UserCheck },
    { title: "Fast Processing", icon: Star },
  ];

  return (
   <>
   <h1 className="text-2xl font-bold">Why Choose This Platform</h1>
    <div
      ref={containerRef}
      className="relative  flex h-[420px] w-full items-start justify-center overflow-hidden p-10"
    >
       <AnimatedGridPattern
        numSquares={31}
        maxOpacity={0.1}
        duration={3}
       
        // className={cn(
        //   "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        //   "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        // )}
      />
      {/* Student Node */}
      <Circle ref={studentRef} className="bg-blue-500 text-white">
        <UserRound />
      </Circle>

      {/* Advantage Nodes */}
      <div className="absolute top-[200px] w-full  items-center justify-around flex-wrap left-1/2 -translate-x-1/2 flex gap-16">
        {advantages.map((adv, idx) => {
          const Icon = adv.icon;
          return (
         <div className="flex items-center justify-center flex-col" key={adv.title}>
               <Circle  ref={advRefs[idx]} className="bg-purple-500 text-white">
              <Icon size={20} />
            </Circle>
              <p>{adv.title}</p>
         </div>
          );
        })}
      </div>

      {/* Beams from student to advantage nodes */}
      {advantages.map((adv, idx) => (
        <AnimatedBeam
          key={adv.title}
          containerRef={containerRef}
          fromRef={studentRef}
          toRef={advRefs[idx]}
          pathColor="gray"
          pathWidth={2}
          pathOpacity={0.4}
          gradientStartColor="#ffaa40"
          gradientStopColor="#9c40ff"
          duration={5 + idx}
          
        />
      ))}
    </div>
   </>
  );
}
