import { z } from "zod";

export const AuthValidation = {
  REGISTER: z.object({
    fullName: z.string().min(2).max(100),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(100),
  }),
  LOGIN: z.object({
    identifier: z.string(),
    password: z.string(),
  }),
};
