"use client";
import { ReactElement } from "react";
import { Spacer, Flex, Tag, Box, Badge } from "@chakra-ui/react";
import {
  Sidebar,
  SidebarSection,
  NavItem,
  NavGroup,
  SidebarOverlay,
  PersonaAvatar,
  SidebarToggleButton,
} from "@saas-ui/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { motion } from "framer-motion";

interface NavItemProps {
  icon: ReactElement;
  label: string;
}

interface SideBarProps {
  navItems: NavItemProps[];
}

export default function SidebarComponent({ navItems }: SideBarProps) {
  const user = useCurrentUser();
  const role = user?.role || "UNDEFINED";
  const userName = user?.firstName || user?.email;

  return (
    <Box height="100vh">
      <Sidebar
        motionPreset="slideInOut"
        width="100%"
        height="100vh"
        toggleBreakpoint="lg"
        variant="default"
        transition="width"
        transitionDuration="normal"
      >
        <SidebarToggleButton isRound={true} />
        <SidebarSection gap="3" direction="row" overflow="hidden">
          <Flex overflow="hidden" minWidth="0" alignItems="center" gap="3">
            <PersonaAvatar
              name={user?.firstName || user?.email?.split("@")[0].toUpperCase()}
              bgColor="blue.500"
              src={user?.image || undefined}
              size="md"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                maxWidth="200px"
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
          <Spacer />
        </SidebarSection>
        <SidebarSection flex="1" overflowY="auto" overflowX="hidden">
          <NavGroup gap="4">
            {navItems.map((item) => (
              <Box p="0.5">
                <NavItem
                  size="lg"
                  fontWeight="semibold"
                  key={item.label}
                  fontSize="20px"
                >
                  {item.label}
                </NavItem>
              </Box>
            ))}
          </NavGroup>
        </SidebarSection>
        <SidebarOverlay zIndex="1" />
      </Sidebar>
    </Box>
  );
}
