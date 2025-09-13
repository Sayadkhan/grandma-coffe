"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ImageAbout = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const images = containerRef.current.querySelectorAll("img");

    images.forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%", // when image top reaches 80% of viewport
            end: "bottom 20%",
            toggleActions: "play reverse play reverse", // animate every scroll
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="py-10 px-4 md:px-10 flex flex-col md:flex-row gap-5">
      {/* Left side */}
      <div className="relative w-full md:w-1/2 h-64 md:h-96">
        <Image
          priority
          unoptimized
          src="https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={400}
          height={400}
          alt="Coffee beans"
          className="w-full lg:w-96 h-full object-cover rounded-xl shadow-lg"
        />

        <Image
          priority
          unoptimized
          src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
          width={300}
          height={300}
          alt="Latte art"
          className="absolute top-20 left-[250px] w-2/4 rounded-xl shadow-xl hidden lg:block h-96 object-cover"
        />
      </div>

      {/* Right side */}
      <div className="relative w-full md:w-1/2 h-64 md:h-96">
        <Image
          priority
          unoptimized
          src="https://images.pexels.com/photos/2130133/pexels-photo-2130133.jpeg"
          width={400}
          height={400}
          alt="Coffee brewing"
          className="w-full lg:w-96 h-full object-cover rounded-xl shadow-lg"
        />

        <Image
          priority
          unoptimized
          src="https://images.pexels.com/photos/30361023/pexels-photo-30361023.jpeg"
          width={300}
          height={300}
          alt="Coffee cup"
          className="absolute top-20 left-[250px] w-2/4 rounded-xl shadow-xl hidden lg:block h-96 object-cover"
        />
      </div>
    </div>
  );
};
