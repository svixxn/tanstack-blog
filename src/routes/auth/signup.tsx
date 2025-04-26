import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, AtSign, Key, User } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { useAppForm } from "~/components/ui/form";
import { Icons } from "~/components/ui/icons";
import { Input, InputPassword } from "~/components/ui/input";
import { useSignUpUser } from "~/domains/auth";
import { signupSchema } from "~/domains/auth/schemas";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: signupMutation } = useSignUpUser();

  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      // checkTerms: false,
    },
    validators: {
      onChange: signupSchema,
    },
    onSubmit: async ({ value }) => {
      await signupMutation(value, {
        onSuccess: () => {
          toast("Success", {
            description: "Account created successfully",
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
          <p className="text-muted-foreground">Join the conversation today</p>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <form.AppField
                name="firstName"
                children={(field) => (
                  <field.FormItem className="space-y-2">
                    <field.FormLabel htmlFor={field.name}>
                      First name
                    </field.FormLabel>
                    <field.FormControlIcon icon={<User />}>
                      <field.FormControl>
                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="John"
                        />
                      </field.FormControl>
                    </field.FormControlIcon>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="lastName"
                children={(field) => (
                  <field.FormItem className="space-y-2">
                    <field.FormLabel htmlFor={field.name}>
                      Last name
                    </field.FormLabel>
                    <field.FormControlIcon icon={<User />}>
                      <field.FormControl>
                        <Input
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Smith"
                        />
                      </field.FormControl>
                    </field.FormControlIcon>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>

            <form.AppField
              name="username"
              children={(field) => (
                <field.FormItem className="space-y-2">
                  <field.FormLabel>Username</field.FormLabel>
                  <field.FormControlIcon icon={<AtSign />}>
                    <field.FormControl>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="johnsmith"
                      />
                    </field.FormControl>
                  </field.FormControlIcon>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="email"
              children={(field) => (
                <field.FormItem className="space-y-2">
                  <field.FormLabel>Email</field.FormLabel>
                  <field.FormControlIcon icon={<AtSign />}>
                    <field.FormControl>
                      <Input
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="name@example.com"
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
                  <field.FormLabel>Password</field.FormLabel>
                  <field.FormControlIcon icon={<Key />}>
                    <field.FormControl>
                      <InputPassword
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="••••••••"
                      />
                    </field.FormControl>
                  </field.FormControlIcon>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="confirmPassword"
              children={(field) => (
                <field.FormItem className="space-y-2">
                  <field.FormLabel>Confirm password</field.FormLabel>
                  <field.FormControlIcon icon={<Key />}>
                    <field.FormControl>
                      <InputPassword
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="••••••••"
                      />
                    </field.FormControl>
                  </field.FormControlIcon>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              {/* <form.Field
                name="checkTerms"
                children={(field) => (
                  <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onBlur={field.handleBlur}
                    onCheckedChange={(checked) => console.log(checked)}
                  />
                )}
              /> */}
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a href="/auth/signup" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/auth/signup" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <form.AppForm>
              <form.FormButton className="w-full">
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
                  Or sign up with
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
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in <ArrowRight className="inline h-3 w-3" />
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
