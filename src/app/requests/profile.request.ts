import { z } from "zod";
import { passwordSchema } from "./users.request";

export const ProfileRequest = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name must not exceed 15 characters"),

  email: z
    .string()
    .email("Invalid email format")
    .max(50, "Email must not exceed 50 characters"),

  password: z
    .union([passwordSchema, z.null(), z.literal("")])
    .optional(),

  biodata: z
    .string()
    .max(250, "Biodata must not exceed 250 characters")
    .optional(),
});

export type ProfileRequestType = z.infer<typeof ProfileRequest>;