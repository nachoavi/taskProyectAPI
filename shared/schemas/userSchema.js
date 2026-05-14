import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(6, "6 characters minimum")
    .max(50, "50 characteres maximum")
    .trim(),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email")
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "6 characters minimum")
    .max(50, "50 characteres maximum")
    .trim(),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email")
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "6 characters minimum")
    .max(50, "50 characteres maximum")
    .trim(),
});

export const validateLogin = (data) => {
  return loginSchema.safeParse(data);
};

export const validateCreateUser = (data) => {
  return userSchema.safeParse(data);
};
