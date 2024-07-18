import AppshellContent from "@/components/AppshellContent";
import NavbarComponent from "@/components/NavbarComponent";
import { AppShell } from "@saas-ui/react";

export default async function ApplicantPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell navbar={<NavbarComponent />}>
      <AppshellContent>{children}</AppshellContent>
    </AppShell>
  );
}
