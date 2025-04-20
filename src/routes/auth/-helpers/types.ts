import { z } from "zod";
import { loginSchema, signupSchema } from "./schemas";

export type Login = z.infer<typeof loginSchema>;

export type Signup = z.infer<typeof signupSchema>;

export type FilteredSignup = Omit<
  z.infer<typeof signupSchema>,
  "confirmPassword" | "checkTerms"
>;
