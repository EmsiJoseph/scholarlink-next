"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema, RegistrationSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const registration = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values);
  console.log(values);

  if (!validatedField.success) {
    console.log(validatedField);
    return { error: "Invalid credentials!" };
  }

  const { firstName, lastName, middleName, email, password, year, month, day } =
    validatedField.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already taken!" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      personal: {
        create: {
          firstName,
          lastName,
          middleName,
          dob: new Date(`${year}-${month}-${day}`),
          mobile: "",
          gender: "",
        },
      },
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
