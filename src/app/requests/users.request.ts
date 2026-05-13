import { z } from "zod";
import { UserService } from "../services/users.service";

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must not exceed 20 characters")
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least 1 lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least 1 uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least 1 number",
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Password must contain at least 1 symbol",
  });

export const UserCreateRequest = z.object({
  group_id: z
    .number()
    .int()
    .positive()
    .refine((val) => val !== 1, {
      message: "Invalid group",
    }),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name must not exceed 15 characters"),

  email: z
    .string()
    .max(50, "Email must not exceed 50 characters")
    .email("Invalid email format")
    .refine(
      async (email) => {
        const exist = await UserService.findByEmail(email);
        return !exist;
      },
      {
        message: "Email is already registered",
      },
    ),

  password: passwordSchema,

  biodata: z
    .string()
    .max(250, "Biodata must not exceed 250 characters")
    .optional(),
});

export const UserUpdateRequest = z.object({
  group_id: z
    .number()
    .int()
    .positive()
    .refine((val) => val !== 1, {
      message: "Invalid group",
    }),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name must not exceed 15 characters"),

  email: z
    .string()
    .max(50, "Email must not exceed 50 characters")
    .email("Invalid email format"),

  password: z.union([passwordSchema, z.null(), z.literal("")]).optional(),

  biodata: z
    .string()
    .max(250, "Biodata must not exceed 250 characters")
    .optional(),
});

export type UserCreateRequestType = z.infer<typeof UserCreateRequest>;
export type UserUpdateRequestType = z.infer<typeof UserUpdateRequest>;
