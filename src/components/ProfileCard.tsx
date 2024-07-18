"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Text } from "@chakra-ui/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useUserPersonal } from "@/hooks/use-user-personal";

const ProfileCard = () => {
  const user = useCurrentUser();

  //TODO: Add a two factor authentication status badge
  const personal = useUserPersonal();

  return (
    <Card className="w-full h-full p-4">
      <CardHeader className="flex items-center justify-center">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={user?.image || "/default-avatar.png"}
            alt="User Avatar"
          />
          <AvatarFallback>
            {`${personal?.firstName?.charAt(0) || "J"}${
              personal?.lastName?.charAt(0) || "D"
            }`}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <Text fontSize="2xl" fontWeight="bold">
          {`${personal?.firstName || "John"} ${personal?.lastName || "Doe"}`}
        </Text>
        <Text fontSize="lg" color="gray.500">
          {user?.email || "user@example.com"}
        </Text>
        <Text fontSize="md" color="gray.500">
          Date of Birth:{" "}
          {personal?.dob ? new Date(personal.dob).toLocaleDateString() : "N/A"}
        </Text>
      </CardContent>
      <CardFooter className="text-center">
        <Text fontSize="md" color="gray.500">
          Applicant Status: {"Pending"}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
