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
import { Icons } from "~/components/ui/icons";

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
                <Icons.Google />
                Google
              </Button>
              <Button variant="outline">
                <Icons.Facebook />
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
