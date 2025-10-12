import React from "react";

const CompaniesSliderLandingPage = () => {
  const companyLogos = [
    "slack",
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook",
  ];

  return (
    <>
      <style>{`
        .marquee-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          max-width: 64rem; /* same as max-w-5xl */
          margin: 0 auto;
          user-select: none;
        }

        .marquee-inner {
          display: flex;
          will-change: transform;
          min-width: 200%;
          animation: marqueeScroll 25s linear infinite;
        }

        .marquee-inner:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .fade-left, .fade-right {
          position: absolute;
          top: 0;
          height: 100%;
          width: 5rem;
          pointer-events: none;
          z-index: 10;
        }

        .fade-left {
          left: 0;
          background: linear-gradient(to right, #f0f4f9, transparent);
        }

        .fade-right {
          right: 0;
          background: linear-gradient(to left, #f0f4f9, transparent);
        }

        .company-logo {
          width: auto;
          height: 3rem;
          object-fit: contain;
          margin: 0 1.5rem;
          filter: brightness(0) saturate(100%) invert(25%) sepia(10%) saturate(500%) hue-rotate(180deg);
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .company-logo:hover {
          transform: scale(1.1);
          filter: none;
        }
      `}</style>
  <div>
       <p className="py-6 text-center  mt-14">Trusting by leading brands, including</p>
  </div>
      <div className="marquee-container bg-transparent]">
        <div className="fade-left" />
        <div className="marquee-inner bg-transparent]">
          {[...companyLogos, ...companyLogos].map((company, index) => (
            <img
              key={index}
              src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
              alt={company}
              className="company-logo"
              draggable={false}
            />
          ))}
        </div>
        <div className="fade-right" />
      </div>
    </>
  );
};

export default CompaniesSliderLandingPage;

