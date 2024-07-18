import { ButtonGroup, Flex, Grid } from "@chakra-ui/react";
import {
  FormLayout,
  PrevButton,
  NextButton,
  SubmitButton,
} from "@saas-ui/react";
import { StepForm } from "@saas-ui/forms/zod";
import { RegistrationSchema } from "@/schemas";
import { CardWrapper } from "@/components/CardWrapper";
import { useState, useTransition } from "react";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { registration } from "@/actions/registration";
import { z } from "zod";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AccountForm() {
  const [showSocial, setShowSocial] = useState<boolean>(true);
  const [headerTitle, setHeaderTitle] = useState<string>(
    "Hello! Let's start with the basics."
  );
  const [headerDescription, setHeaderDescription] = useState<string>(
    "Enter your full name to get started with your account creation."
  );
  const [error, setError] = useState<string | undefined>("");
  const [dobError, setDobError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const steps = [
    {
      name: "initial",
      schema: RegistrationSchema.shape.initial,
    },
    {
      name: "account",
      schema: RegistrationSchema.shape.account,
    },
    {
      name: "dob",
      schema: RegistrationSchema.shape.dob,
    },
  ];
  const handleDefaultClick = () => {
    setDobError("");
    setShowSocial(true);
    setHeaderTitle("Hello! Let's start with the basics.");
    setHeaderDescription(
      "Enter your full name to get started with your account creation."
    );
  };

  const handleInitialClick = () => {
    setDobError("");
    setShowSocial(false);
    setHeaderTitle("When were you born?");
    setHeaderDescription(
      "To access Scholarlink, you must be at least 16 years old."
    );
  };

  const validateDob = (year: any) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    if (age < 16) {
      setDobError("You must be at least 16 years old to register.");
      return false;
    }
    setDobError("");
    return true;
  };

  const handleDobClick = () => {
    if (dobError === "") {
      return;
    } else {
      setHeaderTitle("Almost there! Let's create your account.");
      setHeaderDescription(
        "Enter your email and password to complete your account."
      );
    }
  };

  const onSubmit = (values: z.infer<typeof RegistrationSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      // @ts-ignore
      registration(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="relative z-10 flex items-center justify-center w-full h-full">
      {isPending ? (
        <CardWrapper
          headerTitle="Signing you up..."
          headerDescription="Please wait while we create your account."
        >
          <LoadingSpinner />
        </CardWrapper>
      ) : success || error ? (
        <CardWrapper
          headerTitle={
            success ? "Confirmation email sent!" : "Something went wrong!"
          }
          headerDescription={
            success
              ? "Please check your email for the confirmation link."
              : "Please try again."
          }
          backButtonLabel={success ? "Back to login" : "Retry"}
          backButtonHref={success ? "/auth/login" : "reload"}
        >
          {success ? (
            <FormSuccess message={success} />
          ) : (
            <FormError message={error} />
          )}
        </CardWrapper>
      ) : (
        <CardWrapper
          headerTitle={headerTitle}
          headerDescription={headerDescription}
          backButtonLabel="Already have an account?"
          backButtonHref="/auth/login"
          showSocial={showSocial}
        >
          <StepForm mx="auto" steps={steps} onSubmit={onSubmit}>
            {({ Field, FormStep }) => (
              <FormLayout>
                <FormStep name="initial">
                  <FormLayout>
                    <Field
                      autoFocus
                      style={{ textTransform: "uppercase" }}
                      onChange={(e: any) => {
                        e.target.value = e.target.value.toUpperCase();
                      }}
                      isRequired
                      name="lastName"
                      label="Last name"
                      placeholder="Dela Cruz"
                    />
                    <Field
                      isRequired
                      style={{ textTransform: "uppercase" }}
                      onChange={(e: any) => {
                        e.target.value = e.target.value.toUpperCase();
                      }}
                      name="firstName"
                      label="First name"
                      placeholder="Juan"
                    />
                    <Field
                      style={{ textTransform: "uppercase" }}
                      onChange={(e: any) => {
                        e.target.value = e.target.value.toUpperCase();
                      }}
                      name="middleName"
                      label="Middle name (optional)"
                    />
                    <Field
                      name="terms"
                      type="checkbox"
                      label="I accept the terms & conditions."
                      isRequired
                    />
                    <NextButton onClick={handleInitialClick} size="md" />
                  </FormLayout>
                </FormStep>
                <FormStep name="dob">
                  <FormLayout>
                    <FormLayout columns={[1, null, 3]}>
                      <Field
                        autoFocus
                        placement="auto-start"
                        isRequired
                        name="month"
                        type="select"
                        options={[
                          { value: "2", label: "February" },
                          { value: "1", label: "January" },
                          { value: "3", label: "March" },
                          { value: "4", label: "April" },
                          { value: "5", label: "May" },
                          { value: "6", label: "June" },
                          { value: "7", label: "July" },
                          { value: "8", label: "August" },
                          { value: "9", label: "September" },
                          { value: "10", label: "October" },
                          { value: "11", label: "November" },
                          { value: "12", label: "December" },
                        ]}
                        placeholder="Month"
                      />
                      <Field
                        isRequired
                        hideStepper={true}
                        name="day"
                        type="number"
                        min={1}
                        max={31}
                        placeholder="Day"
                      />
                      <Field
                        isRequired
                        hideStepper={true}
                        name="year"
                        type="number"
                        min={new Date().getFullYear() - 100}
                        max={new Date().getFullYear()}
                        placeholder="Year"
                        //@ts-ignore
                        onChange={(value: Value) => {
                          validateDob(value);
                        }}
                      />
                    </FormLayout>
                    {dobError && <FormError message={dobError} />}
                    <ButtonGroup size="md" w="full" isAttached>
                      <Flex w="full" justify="center">
                        <Grid w="full" templateColumns="1fr 1fr" gap={4}>
                          <PrevButton onClick={handleDefaultClick} w="100%" />
                          <NextButton onClick={handleDobClick} size="md" />
                        </Grid>
                      </Flex>
                    </ButtonGroup>
                  </FormLayout>
                </FormStep>
                <FormStep name="account">
                  <FormLayout>
                    <Field
                      autoFocus
                      isRequired
                      name="email"
                      type="email"
                      label="Email address"
                      placeholder="juandelacruz@gmail.com"
                    />
                    <Field
                      isRequired
                      name="password"
                      type="password"
                      label="Password"
                    />
                    <Field
                      isRequired
                      name="confirmPassword"
                      type="password"
                      label="Confirm password"
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <ButtonGroup size="md" w="full" isAttached>
                      <Flex w="full" justify="center">
                        <Grid w="full" templateColumns="1fr 1fr" gap={4}>
                          <PrevButton onClick={handleInitialClick} w="100%" />
                          <SubmitButton w="100%">Sign up</SubmitButton>
                        </Grid>
                      </Flex>
                    </ButtonGroup>
                  </FormLayout>
                </FormStep>
              </FormLayout>
            )}
          </StepForm>
        </CardWrapper>
      )}
    </div>
  );
}
