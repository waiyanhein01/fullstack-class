import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigation, useSubmit } from "react-router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { PasswordInput } from "@/features/auth/login/components/PasswordInput";

const FormSchema = z.object({
  username: z.string().nonempty({
    message: "Name is required.",
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
    }),
});

export function AdminLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  // const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    submit(data, { method: "post", action: "." }); // you can use this action will go current screen to another screen situation
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-6", className)}
          {...props}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              Sign In to your admin account
            </h1>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:border-primary focus:ring-primary rounded-md border"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2">
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

              {/* error message from server with react router action data */}
              {/* {actionData && (
                <p className="text-sm text-red-500">
                  {actionData?.error.message}
                </p>
              )} */}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-1">
                  Loading <LoaderCircle className="animate-spin" />
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>

          <div className="rounded-lg border border-[#b7edd8] bg-gradient-to-r from-[#d8ece4]/50 to-[#b7edd8]/30 p-4">
            <h1 className="text-sm font-medium text-[#288863]">
              Employee Login:
            </h1>
            <p className="mt-2 text-xs font-medium text-[#4c9d7e]">
              Please use your employee username and password to login. Contact
              your manager if you don't have credentials.
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}
