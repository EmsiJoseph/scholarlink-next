"use client";

import Link from "next/link";

export default function ManagerHome() {
  return (
    <div>
      MANAGER
      <Link href="/home/dashboard" color="blue.400">
        Dashboard
      </Link>
    </div>
  );
}
