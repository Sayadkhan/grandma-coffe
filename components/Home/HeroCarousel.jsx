"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const NAVBAR_HEIGHT = 64; // px -> same as Tailwind h-16



export default function CarouselDemo({slides}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  return (
    <Card className="relative w-full mx-auto border-0 shadow-none">
      <CardContent className="p-0">
        <div className="embla group">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex touch-pan-y select-none">
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className="min-w-0 flex-[0_0_100%]"
                  style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={slide.id === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                    {/* Animate Title + Subtitle */}
                    <AnimatePresence mode="wait">
                      {selectedIndex === i && (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="container mx-auto absolute top-1/2 -translate-y-1/2 left-0 right-0 p-6 md:p-8 text-white flex flex-col gap-4 text-center"
                        >
                          <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-4xl md:text-7xl font-bold drop-shadow-lg"
                          >
                            {slide.title}
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-xl md:text-3xl opacity-90"
                          >
                            {slide.subtitle}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>

            {/* Prev/Next Controls - Bottom Center */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={scrollPrev}
                className="h-10 w-10 rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={scrollNext}
                className="h-10 w-10 rounded-full bg-white/90 backdrop-blur hover:bg-white shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>


          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  selectedIndex === i
                    ? "w-6 bg-white"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
