"use client";

import { Box, useBreakpointValue } from "@chakra-ui/react";

interface AppshellContentProps {
  children: React.ReactNode;
}

export default function AppshellContent({ children }: AppshellContentProps) {
  const isNative = useBreakpointValue({
    base: true,
    md: false,
  });
  const mt = isNative ? "0" : "0";
  return (
    <Box mt={mt} as="main" flex="1" py="2" px="4" overflowY="auto">
      {children}
    </Box>
  );
}
