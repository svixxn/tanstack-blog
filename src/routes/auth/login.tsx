import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, AtSign, Key } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { useLoginUser } from "./-helpers";
import { toast } from "sonner";
import { loginSchema } from "./-helpers/schemas";
import { useAppForm } from "~/components/ui/form";
import React from "react";

export const Route = createFileRoute("/auth/login")({
  component: SignInPage,
});

function SignInPage() {
  const { mutateAsync: loginMutation } = useLoginUser();
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await loginMutation(value, {
        onSuccess: () => {
          toast("Success", {
            description: "You have been logged in",
          });
          formApi.reset();
          router.navigate({
            to: "/",
          });
        },
        onError: (error) => {
          toast("Error", {
            description: error.message,
          });
        },
      });
    },
  });

  const handleSubmit = React.useCallback(
    <T,>(e: React.FormEvent<T>) => {
      e.stopPropagation();
      e.preventDefault();
      form.handleSubmit();
    },
    [form],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-primary font-bold text-4xl mb-2">Bloggy</h1>
          <p className="text-muted-foreground">Welcome back</p>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form.AppField
              name="email"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Email</field.FormLabel>
                  <field.FormControlIcon icon={<AtSign />}>
                    <field.FormControl>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="name@example.com"
                        autoComplete="email"
                      />
                    </field.FormControl>
                  </field.FormControlIcon>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
            <form.AppField
              name="password"
              children={(field) => (
                <field.FormItem className="space-y-2">
                  <div className="flex items-center justify-between">
                    <field.FormLabel>Password</field.FormLabel>
                    <Link
                      to="/auth/login"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <field.FormControlIcon icon={<Key />}>
                    <field.FormControl>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        type="password"
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                      />
                    </field.FormControl>
                  </field.FormControlIcon>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
            <form.AppForm>
              <form.FormButton>
                {({ isSubmitting }) =>
                  isSubmitting ? "Submitting..." : "Submit"
                }
              </form.FormButton>
            </form.AppForm>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Google logo"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.61z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Facebook logo"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <a
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/auth/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up <ArrowRight className="inline h-3 w-3" />
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
