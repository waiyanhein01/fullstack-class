import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "../../login/components/PasswordInput";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  firstName: z.string().nonempty({
    message: "First name is required.",
  }),
  lastName: z.string().nonempty({
    message: "Last name is required.",
  }),
  email: z.string().nonempty({
    message: "Email is required.",
  }),
  password: z
    .string()
    .nonempty({
      message: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(8, {
      message: "Password must be at most 8 characters.",
    })
    .regex(/^\d+$/, {
      message: "Password must be numbers.",
    }),
  confirmPassword: z
    .string()
    .nonempty({
      message: "Confirm password is required.",
    })
    .min(8, {
      message: "Confirm password must be at least 8 characters.",
    })
    .max(8, {
      message: "Confirm password must be at most 8 characters.",
    })
    .regex(/^\d+$/, {
      message: "Confirm password must be numbers.",
    }),
});

export function AccountRegistration({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [isMatchError, setIsMatchError] = useState<string | null>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.password !== data.confirmPassword) {
      setIsMatchError("Passwords do not match.");
      return;
    } else {
      setIsMatchError(null);
    }
    submit(data, { method: "post", action: "/register/account-registration" }); // this action is for frontend route
    console.log(data);
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
          >
            <div className="flex flex-col items-center gap-2">
              <Link
                to="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Icons.NavIcon className="size-6" />
                </div>
                <span className="sr-only">Account Registration</span>
              </Link>
              <h1 className="text-xl font-bold">Account Registration</h1>
            </div>
            <div className="grid gap-4">
              <div className="">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:border-primary focus:ring-primary rounded-md border"
                          placeholder="Enter your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:border-primary focus:ring-primary rounded-md border"
                          placeholder="Enter your last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="focus:border-primary focus:ring-primary rounded-md border"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          className="focus:border-primary focus:ring-primary rounded-md border"
                          placeholder="Enter your password"
                          inputMode="numeric"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          className="focus:border-primary focus:ring-primary rounded-md border"
                          placeholder="Enter your confirm password"
                          inputMode="numeric"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* error message from server with react router action data */}
                {actionData && (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-red-500">
                      {actionData?.error.message}
                    </p>
                    <Link
                      to="/register"
                      className="text-sm underline underline-offset-4"
                    >
                      Back to register
                    </Link>
                  </div>
                )}

                {/* password match error message from client */}
                {isMatchError && (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-red-500">{isMatchError}</p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-1">
                    Loading <Icons.LoaderCircleIcon className="animate-spin" />
                  </span>
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
