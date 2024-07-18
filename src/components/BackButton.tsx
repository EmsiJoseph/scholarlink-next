"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface BackButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export function BackButton({ label, href, onClick }: BackButtonProps) {
  return (
    <div className="text-sm">
      <Link
        onClick={onClick}
        href={href || "/"}
        className={`${buttonVariants({
          variant: "link",
        })} px-1 text-normal underline`}
      >
        {label}
      </Link>
    </div>
  );
}
