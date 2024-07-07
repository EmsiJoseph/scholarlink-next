import { LoginBackground } from "@/components/LoginBackground";

export default function ApplicantPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen">
      <LoginBackground />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}
