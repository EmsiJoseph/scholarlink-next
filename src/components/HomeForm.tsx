"use client";
// TODO: Make the home page dynamic
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";

export function HomeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsLoading(true);
    // Simulate a network request
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 2000); // Adjust the delay as needed
  };
  return (
    <Card className="max-w-md w-full p-4">
      <CardHeader className="text-left gap-[32px]">
        <img
          src="/svg/Scholarlink Logo (40 x 40 px).svg"
          alt="Scholarlink"
          className="w-48 h-full"
        />
        <div className="grid gap-[16px]">
          <CardTitle>Welcome to Scholarlink</CardTitle>
          <CardDescription>
            The official Scholar Information System of Gado and Jess Jalandoni
            Scholarship Project!
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          isLoading={isLoading}
          spinner={<BeatLoader size={8} color="white" />}
          width="full"
          size="md"
          colorScheme="blue"
          onClick={handleClick}
        >
          Sign in
        </Button>
      </CardContent>
    </Card>
  );
}
