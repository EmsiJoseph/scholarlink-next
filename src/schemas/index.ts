import * as z from "zod";

export const annualIncomeOptions = [
  "Not applicable",
  "Less than ₱50,000",
  "₱50,000 - ₱99,999",
  "₱100,000 - ₱149,999",
  "₱150,000 - ₱199,999",
  "₱200,000 - ₱249,999",
  "₱250,000 - ₱299,999",
  "₱300,000 - ₱349,999",
  "₱350,000 - ₱399,999",
  "₱400,000 - ₱449,999",
  "₱450,000 - ₱499,999",
  "₱500,000 and above",
];

export const mobileNumberRegex = /^09\d{9}$/;

export const ApplicationFormSchema = [
  {
    personal: z.object({
      lastName: z.string().min(1, "Last name is required"),
      firstName: z.string().min(1, "First name is required"),
      middleName: z.string().optional(),
      dob: z.string().min(1, "Date of Birth is required"),
      birthPlace: z.string().min(1, "Birthplace is required"),
      gender: z.enum(["Male", "Female", "Other"]),
    }),
  },
  {
    contact: z.object({
      email: z.string().email("Invalid email address"),
      mobileNum: z
        .string()
        .regex(
          mobileNumberRegex,
          "Mobile number must be in the format of 09XXXXXXXXX"
        ),
    }),
  },
  {
    address: z.object({
      houseNumStreetName: z
        .string()
        .min(1, "House number and street name is required"),
      region: z.string().min(1, "Region is required"),
      province: z.string().min(1, "Province is required"),
      cityMunicipality: z.string().min(1, "City or Municipality is required"),
      barangay: z.string().min(1, "Barangay is required"),
      zipCode: z.string().min(1, "Zip code is required"),
    }),
  },
  {
    family: z.object({
      motherName: z.string().min(1, "Mother's name is required"),
      motherOccupation: z.string().min(1, "Mother's occupation is required"),
      motherAnnualIncome: z.enum(
        //@ts-ignore
        annualIncomeOptions,
        "Mother's annual income is required"
      ),
      motherMobileNum: z
        .string()
        .regex(
          mobileNumberRegex,
          "Mobile number must be in the format of 09XXXXXXXXX"
        ),
      fatherName: z.string().min(1, "Father's name is required"),
      fatherOccupation: z.string().min(1, "Father's occupation is required"),
      fatherAnnualIncome: z.enum(
        //@ts-ignore
        annualIncomeOptions,
        "Father's annual income is required"
      ),
      fatherMobileNum: z
        .string()
        .regex(
          mobileNumberRegex,
          "Mobile number must be in the format of 09XXXXXXXXX"
        ),
      guardianName: z.string().min(1, "Guardian's name is required"),
      guardianRelationshipToApplicant: z
        .string()
        .min(1, "Relationship to applicant is required"),
      guardianMobileNum: z
        .string()
        .regex(
          mobileNumberRegex,
          "Mobile number must be in the format of 09XXXXXXXXX"
        ),
    }),
  },
  {
    education: z.object({
      trackName: z.string().min(1, "Track name is required"),
      strandName: z.string().min(1, "Strand name is required"),
      shsSchoolYearGraduated: z
        .string()
        .min(1, "School year graduated is required"),
      shsGwa: z.string().min(1, "General Weighted Average is required"),
      shsSchoolName: z.string().min(1, "School name is required"),
      shsSchoolAddress: z.string().min(1, "School address is required"),
      shsSchoolContactNum: z
        .string()
        .min(1, "School contact number is required"),
    }),
  },
];

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
