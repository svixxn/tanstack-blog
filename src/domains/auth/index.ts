import { useMutation } from "@tanstack/react-query";
import { loginFn, signupFn } from "./service";
import type { Login, Signup } from "./types";

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: Login) => loginFn({ data }),
  });
};

export const useSignUpUser = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: Signup) => signupFn({ data }),
  });
};
