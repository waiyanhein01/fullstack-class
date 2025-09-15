import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { Icons } from "@/components/Icons";
import { LoaderCircle } from "lucide-react";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 digits.",
  }),
});

export function VerifyOtp() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    submit(data, { method: "post", action: "/register/verify-otp" }); // this action is for frontend route
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full flex-col items-center gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <Link
                to="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex items-center justify-center rounded-md">
                  <Icons.NavIcon className="size-6" />
                </div>
                <span className="sr-only">verify otp</span>
              </Link>
              <h1 className="text-xl font-bold">Verify Otp for Registration</h1>
              <div className="text-center text-sm">
                We've sent Otp(one-time password) to your phone.
              </div>
            </div>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-1">
                  Loading <LoaderCircle className="animate-spin" />
                </span>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
