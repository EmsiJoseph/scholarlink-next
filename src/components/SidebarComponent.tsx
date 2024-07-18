"use client";
import { ReactElement } from "react";
import {
  useDisclosure,
  IconButton,
  Spacer,
  Flex,
  useBreakpointValue,
  Box,
  Badge,
} from "@chakra-ui/react";
import {
  Sidebar,
  SidebarSection,
  NavItem,
  NavGroup,
  SidebarOverlay,
} from "@saas-ui/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { motion } from "framer-motion";
import SidebarComponentNative from "./SidebarComponentNative";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItemProps {
  icon: ReactElement;
  label: string;
}

interface SideBarProps {
  navItems: NavItemProps[];
}

export default function SidebarComponent({ navItems }: SideBarProps) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  const isNative = useBreakpointValue({
    base: true,
    md: false,
  });

  const user = useCurrentUser();
  const role = user?.role || "UNDEFINED";
  const userName = user?.firstName || user?.email;

  if (isNative) return <SidebarComponentNative navItems={navItems} />;

  return (
    <Sidebar
      width={isOpen ? "280px" : "16"}
      minWidth="auto"
      toggleBreakpoint="lg"
      variant={isOpen ? "default" : "compact"}
      transition="width"
      transitionDuration="normal"
    >
      <SidebarSection gap="3" direction={isOpen ? "row" : "column"}>
        {isOpen ? (
          <Flex minWidth="0" alignItems="center" gap="3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                maxWidth="170px"
                overflow="hidden"
                noOfLines={1}
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
              >
                {userName}
              </Box>
              <Box mt="1">
                <Badge borderRadius="lg" py="1" px="2" colorScheme="blue">
                  {role}
                </Badge>
              </Box>
            </motion.div>
          </Flex>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </motion.div>
        )}
        <Spacer />
        <IconButton
          isRound={true}
          onClick={onToggle}
          variant="ghost"
          size="sm"
          icon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
          aria-label="Toggle Sidebar"
        />
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto" overflowX="hidden">
        <NavGroup>
          {navItems.map((item) => (
            <NavItem size="md" key={item.label} icon={item.icon}>
              {item.label}
            </NavItem>
          ))}
        </NavGroup>
      </SidebarSection>
      <SidebarOverlay zIndex="1" />
    </Sidebar>
  );
}
