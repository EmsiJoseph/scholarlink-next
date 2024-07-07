"use client";
import { LoginBackground } from "@/components/LoginBackground";
import { HomeForm } from "@/components/HomeForm";

export default function App() {
  return (
    <div className="relative w-full h-screen">
      <LoginBackground />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <HomeForm />
      </div>
    </div>
  );
}
