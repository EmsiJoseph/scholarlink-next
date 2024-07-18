"use client";

import { BackButton } from "./BackButton";
import { Header } from "./Header";
import Social from "./Social";
import { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";

import { useRouter } from "next/navigation";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerDescription?: ReactNode;
  backButtonLabel?: string; // Provide a default value for backButtonLabel
  backButtonHref?: string; // Provide a default value for backButtonHref
  showSocial?: boolean;
}
export function CardWrapper({
  children,
  headerTitle,
  headerDescription,
  backButtonLabel = "", // Set a default value for backButtonLabel
  backButtonHref = "", // Set a default value for backButtonHref
  showSocial,
}: CardWrapperProps) {
  const router = useRouter();

  const handleBackButtonClick = () => {
    if (backButtonHref === "reload") {
      router.back();
    } else {
      return;
    }
  };

  return (
    <Card className="max-w-md w-full p-2">
      <Header title={headerTitle} description={headerDescription} />
      <CardContent>{children}</CardContent>
      {showSocial ? (
        <CardFooter className="grid gap-[16px] text-center">
          <CardDescription>or continue with</CardDescription>
          <Social />
        </CardFooter>
      ) : null}
      <CardFooter className="justify-center">
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
          onClick={handleBackButtonClick}
        />
      </CardFooter>
    </Card>
  );
}
