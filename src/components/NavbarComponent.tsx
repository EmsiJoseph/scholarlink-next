"use client";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@saas-ui/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

export default function NavbarComponent() {
  const isNative = useBreakpointValue({
    base: true,
    md: false,
  });
  const user = useCurrentUser();
  const userInitial =
    user?.name?.slice(0, 2) || user?.email?.slice(0, 2).toUpperCase() || "";
  const isApplicant = user?.role === "APPLICANT" ? true : false;
  const ml = isApplicant ? "0" : isNative ? "8" : "0";

  return (
    <Navbar
      position="sticky"
      borderBottomWidth="1px"
      background="transparent"
      backdropFilter="blur(10px)"
      height="86px"
    >
      <NavbarBrand ml={ml} flex="1">
        <div style={{ width: "320px", height: "180px", position: "relative" }}>
          <Image
            src="/jpg/applicant-portal-logo.png"
            alt="Scholarlink Applicant Portal Logo"
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
      </NavbarBrand>
      <NavbarContent justifyContent="flex-end">
        <NavbarItem>
          <Menu>
            <MenuButton>
              <Avatar>
                <AvatarImage src={user?.image || undefined} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </MenuButton>
            <MenuList>
              <MenuGroup title={user?.email || ""}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Help &amp; feedback</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem onClick={() => signOut()}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
