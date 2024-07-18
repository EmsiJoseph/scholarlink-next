"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { CardWrapper } from "@/components/CardWrapper";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/index";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { SubmitButton } from "@saas-ui/react";
import BeatLoader from "react-spinners/BeatLoader";

export function LoginForm() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already taken with different provider"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    setError("");
    setSuccess("");
    if (!termsAccepted) {
      setError("You must accept the terms and conditions to proceed.");
      return;
    }
    // TODO: Add animations to the login form
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();

            setError(data.error);
          }

          if (data?.success) {
            form.reset();

            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
            setEmail(values.email);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  }

  return (
    <CardWrapper
      headerTitle={showTwoFactor ? "We emailed you a code" : "Welcome back!"}
      headerDescription={
        showTwoFactor
          ? parse(
              `Enter the verification code sent to: <strong>${email}</strong>.`
            )
          : "Login to your account"
      }
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/registration"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                disabled={isPending}
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        onComplete={form.handleSubmit(onSubmit)}
                        maxLength={6}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <FormDescription>Didn't get your code?</FormDescription>
                      <Link href="/">Send a new code</Link>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
                // TODO: Add a link to resend the code
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="juandelacruz@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isPending}
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <div className="flex justify-end w-full">
                        <Button
                          size="sm"
                          variant="link"
                          asChild
                          className="text-sm underline px-0 font-normal justify-end"
                        >
                          <Link href="/auth/reset">Forgot password?</Link>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="items-top flex space-x-2">
                  <Checkbox
                    name="terms"
                    onCheckedChange={(checked) =>
                      setTermsAccepted(checked as boolean)
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                    {/* //TODO: Add a link to the terms and conditions */}
                    <p className="text-sm text-muted-foreground">
                      You agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <SubmitButton
            isLoading={isLoading}
            spinner={<BeatLoader size={8} color="white" />}
            disabled={isPending}
            className="w-full"
            size="md"
          >
            {showTwoFactor ? "Verify" : "Login"}
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}
