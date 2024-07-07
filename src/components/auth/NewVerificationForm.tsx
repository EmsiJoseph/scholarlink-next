"use client";

import { CardWrapper } from "../CardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
          setError(undefined);
        } else {
          setSuccess(undefined);
          setError(data.error);
        }
      })
      .catch(() => {
        setSuccess(undefined);
        setError("An error occurred!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerTitle="Confirming your verification, please be patient"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {success && <FormSuccess message={success} />}
        {!success && error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
