"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = [
  "/jpg/BGIMG1.jpg",
  "/jpg/BGIMG2.jpg",
  "/jpg/BGIMG3.jpg",
  "/jpg/BGIMG4.jpg",
  "/jpg/BGIMG5.jpg",
  "/jpg/BGIMG6.jpg",
  "/jpg/BGIMG7.jpg",
  "/jpg/BGIMG8.jpg",
  "/jpg/BGIMG9.jpg",
  "/jpg/BGIMG10.jpg",
];

export function LoginBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLargeScreen) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="w-full h-full">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                style={{ display: index === activeIndex ? "block" : "none" }}
                className="w-full h-full"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700"></div>
  );
}
