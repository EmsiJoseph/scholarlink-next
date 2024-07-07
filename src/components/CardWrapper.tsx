"use client";

import { BackButton } from "./BackButton";
import { Header } from "./Header";
import Social from "./Social";
import { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerDescription?: ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}
export function CardWrapper({
  children,
  headerTitle,
  headerDescription,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
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
        <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
      </CardFooter>
    </Card>
  );
}
