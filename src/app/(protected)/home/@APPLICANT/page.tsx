"use client";

import WelcomeCard from "@/components/applicant/cards/WelcomeCard";
import GjjspCarousel from "@/components/GjjspCarousel";
import StatusCard from "@/components/StatusCard";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export default function ApplicantHome() {
  return (
    <Grid
      h="full"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem colSpan={2}>
        <WelcomeCard />
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip"></GridItem>

      <GridItem colSpan={1}>
        <Box mb={4}>
          <StatusCard
            imageSrc="/jpg/scholarships-sticker.png"
            count={5}
            title="Scholarships"
            subtitle="you are eligible for"
          />
        </Box>
        <Box mb={4}>
          <StatusCard
            imageSrc="/jpg/applications-sticker.png"
            count={0}
            title="Applications"
            subtitle="submitted"
          />
        </Box>
        <Box>
          <StatusCard
            imageSrc="/jpg/messages-sticker.png"
            count="1"
            title="Messages"
            subtitle="unread"
          />
        </Box>
      </GridItem>

      <GridItem rowSpan={2} colSpan={3}>
        <GjjspCarousel />
      </GridItem>
      <GridItem rowSpan={2} colSpan={2} bg="papayawhip" />
    </Grid>
  );
}
