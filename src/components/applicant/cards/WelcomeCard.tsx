"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentSchoolYear } from "@/data/school-year-data";
import { Heading } from "@chakra-ui/react";
export default function WelcomeCard() {
  return (
    <Card className="p-2 h-full">
      <CardHeader>
        <Heading
          textColor="gray.800"
          as="h1"
          size="xl"
          lineHeight="1.5"
          noOfLines={3}
        >
          Welcome to the GJJSP Scholarships Application Portal for{" "}
          {currentSchoolYear()}
        </Heading>
      </CardHeader>
      <CardContent className="text-left flex items-center">
        <div className="w-full max-w-44 flex-shrink-0 mr-4">
          <video
            src="https://cdn-icons-mp4.flaticon.com/512/14250/14250651.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-lg object-contain"
          />
        </div>
        <div className="flex-grow">
          <p className="text-xl mt-2">
            {/* //TODO: Add the links */}
            Not sure where to start? {<br />}
            {<br />}Check out the{" "}
            <a href="#" className="text-blue-500">
              Scholarship Application Guide
            </a>{" "}
            and the{" "}
            <a href="#" className="text-blue-500">
              Frequently Asked Questions
            </a>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
