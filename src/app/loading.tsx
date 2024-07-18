"use client";
import { LoadingOverlay, LoadingSpinner } from "@saas-ui/react";
import React from "react";

export default function Loading() {
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  return (
    <LoadingOverlay variant="fullscreen" isLoading={isLoading}>
      <LoadingSpinner />
    </LoadingOverlay>
  );
}
