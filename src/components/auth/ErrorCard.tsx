import { TriangleAlert } from "lucide-react";
import { CardWrapper } from "../CardWrapper";

export default function ErrorCard() {
  return (
    <CardWrapper
      headerTitle="Oops! Something went wrong!"
      backButtonLabel="Back to home"
      backButtonHref="/"
    >
      <div className="w-full flex justify-center items-center">
        <TriangleAlert className="w-full h-[90px] text-destructive" />
      </div>
    </CardWrapper>
  );
}
