"use client";

import { theme } from "@/app/theme";
import { SaasProvider } from "@saas-ui/react";

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SaasProvider theme={theme}>{children}</SaasProvider>;
}
