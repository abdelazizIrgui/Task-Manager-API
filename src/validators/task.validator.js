import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z.string()
  .trim()
  .min(10,"description must be at least 10 characters")
  .max(500,"description cannot exceed 500 characters")
});

export const UpdateTaskSchema = z.object({
  title: z.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),

  description: z.string()
  .trim()
  .min(10,"description must be at least 10 characters")
  .max(500,"description cannot exceed 500 characters")
  .optional(),

  status: z.enum(["pending", "in-progress","completed"]).optional()
    .default("pending"),
   
  priority: z.enum(["high", "medium","low"]).optional()
    .default("low"),  
});