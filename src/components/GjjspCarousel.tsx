"use client";

import { Box, Image, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

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

const GjjspCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <Box
      w="100%"
      h="100%"
      position="relative"
      overflow="hidden"
      borderRadius="xl"
    >
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          boxSize="100%"
          objectFit="cover"
          position="absolute"
          top="0"
          left="0"
          transition="none"
          display={index === activeIndex ? "block" : "none"}
        />
      ))}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex="1"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="left"
        maxWidth="600px"
        zIndex="2"
      >
        <Text fontSize="6xl" fontWeight="normal" color="white" mb={12}>
          Fund your entire college education with one simple form.
        </Text>
        <Button
          fontSize="xl"
          size="lg"
          colorScheme="blue"
          rightIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-right"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          }
        >
          Apply now
        </Button>
      </Box>
    </Box>
  );
};

export default GjjspCarousel;
