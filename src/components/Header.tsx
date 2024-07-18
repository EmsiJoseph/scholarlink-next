import { useBreakpointValue } from "@chakra-ui/react";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";

interface HeaderProps {
  title: string;
  description?: React.ReactNode;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <CardHeader className="text-center flex flex-col items-center gap-[16px]">
      <img
        src="/svg/Scholarlink Logo (40 x 40 px).svg"
        alt="Scholarlink"
        className="w-48 h-full"
      />
      <div className="grid gap-[16px] text-center">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
    </CardHeader>
  );
}
