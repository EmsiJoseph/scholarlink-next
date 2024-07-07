"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}

export function BackButton({ label, href }: BackButtonProps) {
  return (
    <div className="text-sm">
      <Link
        href={href}
        className={`${buttonVariants({
          variant: "link",
        })} px-1 text-normal underline`}
      >
        {label}
      </Link>
    </div>
  );
}
