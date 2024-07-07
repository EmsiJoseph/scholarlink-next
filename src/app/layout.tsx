import type { Metadata } from "next";
import "../styles/globals.css";
import { fonts } from "./fonts";

import { cn } from "../lib/utils";
import { SessionProviderWrapper } from "./session-provider";
import { ThemeProvider } from "@emotion/react";
import { ThemeProviderWrapper } from "./theme-provider";

export const metadata: Metadata = {
  title: "Scholarlink",
  description:
    "The official Scholar Information System of Gado and Jess Jalandoni Scholarship Project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <html lang="en" className={fonts.inter.variable}>
        <head />

        <body
          className={cn("min-h-screen bg-background font-sans antialiased")}
        >
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
