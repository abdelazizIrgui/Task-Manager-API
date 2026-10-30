
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name cannot exceed 25 characters"),

  email: z.email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z.string()
    .min(4, "Password must be at least 4 characters")
    .max(16, "Password cannot exceed 16 characters"),

  role: z.enum(["user", "admin"]).optional()
    .default("user")
});


export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});
