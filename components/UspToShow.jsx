import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons"
import { BellIcon, Share2Icon } from "lucide-react"

import MagicBento from "./ui/MagicBento";
import AnimatedContent from "./AnimatedContent";
// import { Calendar } from "@/components/ui/calendar"
// import AnimatedBeamMultipleOutputDemo from "@/registry/example/animated-beam-multiple-outputs"
// import AnimatedListDemo from "@/registry/example/animated-list-demo"

// import { Marquee } from "@/registry/magicui/marquee"





export function UspToShow() {
  return (
    <div className="overflow-x-hidden">
      <AnimatedContent
  distance={150}
  direction="horizontal"
  reverse={false}
  duration={1.2}
  ease="bounce.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={0.3}
>

   <MagicBento
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={false}
  enableMagnetism={false}
  clickEffect={true}
  spotlightRadius={400}
  particleCount={62}
  glowColor="0, 176, 245"
/>
</AnimatedContent>
    </div>
  );
}



// const features = [
//   {
//     Icon: FileTextIcon,
//      name: "Online Application",
//     description: "Submit your internship application digitally with ease.",
//     className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  
//   },
//   {
//     Icon: BellIcon,
//        name: "Digital Verification",
//     description: "Your application is verified automatically and securely.",
//      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
//  videoSrc:'https://cdnl.iconscout.com/lottie/premium/preview-watermark/identity-verification-mobile-apps-animation-gif-download-6623904.mp4'
//   },
//   {
//     Icon: Share2Icon,
//      name: "Quick Processing",
//     description: "Get your NOC processed quickly without delays.",
//       className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
//   },
//   {
//     Icon: CalendarIcon,
//     name: "Certificate Download",
//     description: "Download your NOC instantly once approved.",
//     className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 h-56",
//   },
//   {
//     Icon: CalendarIcon,
//    name: "Application Tracking",
//     description: "Track the status of your NOC application in real-time.",
//        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
//   },
// ]