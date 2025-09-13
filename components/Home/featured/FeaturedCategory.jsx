"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Featured = () => {
  const featureRef = useRef(null);
  const featureLeftShutterRef = useRef(null);
  const featureRightShutterRef = useRef(null);

  useEffect(() => {
    if (featureLeftShutterRef.current && featureRightShutterRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: featureRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.to(featureLeftShutterRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 1.5,
        ease: "power4.inOut",
      }).to(
        featureRightShutterRef.current,
        {
          x: "100%",
          opacity: 0,
          duration: 1.5,
          ease: "power4.inOut",
        },
        "-=1.2"
      );
    }
  }, []);

  return (
    <section
      className="container mx-auto overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
      ref={featureRef}
    >
      <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-wide mb-12 text-[#6B4226] text-center lg:text-left">
        Our Featured Blends
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[30%_auto] items-center gap-8 lg:gap-[6rem]">
        {/* Left Feature */}
        <div className="flex flex-col gap-4 relative overflow-hidden">
          <span className="tracking-[3px] font-semibold text-[#6B4226] uppercase">
             Sumatra Costa Rica
          </span>
          <img
            className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[600px] object-cover rounded-xl shadow-lg"
            src="https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg"
            alt="Artisan Coffee Beans"
          />
          <span
            ref={featureLeftShutterRef}
            className="absolute inset-0 w-full h-full bg-[#6B4226] z-10"
          ></span>
        </div>

        {/* Right Feature */}
        <div className="flex flex-col gap-4 relative overflow-hidden mt-8 lg:mt-0">
          <span className="tracking-[3px] font-semibold text-[#6B4226] uppercase">
            Ethiopia
          </span>
          <img
            className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[600px] object-cover rounded-xl shadow-lg"
            src="https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg"
            alt="Handcrafted Coffee"
          />
          <span
            ref={featureRightShutterRef}
            className="absolute inset-0 w-full h-full bg-[#6B4226] z-10"
          ></span>
        </div>
      </div>
    </section>
  );
};

export default Featured;
