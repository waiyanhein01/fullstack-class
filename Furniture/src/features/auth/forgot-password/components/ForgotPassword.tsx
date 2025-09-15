import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const FormSchema = z.object({
  phone: z
    .string()
    .nonempty({
      message: "Phone number is required.",
    })
    .min(7, {
      message: "Phone number must be at least 7 characters.",
    })
    .max(12, {
      message: "Phone number must be at most 12 characters.",
    })
    .regex(/^\d+$/, {
      message: "Phone number must be numbers.",
    }),
});

export function ForgotPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    submit(data, { method: "post", action: "." }); //"." means current route
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
                <span className="sr-only">register</span>
              </Link>
              <h1 className="text-xl font-bold">Forgot Password</h1>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          className="focus:border-primary focus:ring-primary rounded-md border"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {actionData && (
                  <p className="text-sm text-red-500">
                    {actionData?.error.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-1">
                    Loading <Icons.LoaderCircleIcon className="animate-spin" />
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
