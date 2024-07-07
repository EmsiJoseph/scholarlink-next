"use client";
// TODO: Make the home page dynamic
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function HomeForm() {
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
        <div className="grid gap-[14px]">
          <Link
            href="/auth/login"
            className={buttonVariants({ variant: "default" })}
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
