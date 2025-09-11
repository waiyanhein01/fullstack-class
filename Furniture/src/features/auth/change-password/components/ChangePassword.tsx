import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { PasswordInput } from "../../login/components/PasswordInput";
import { useNavigation, useSubmit } from "react-router";
import { LoaderCircle } from "lucide-react";
import Container from "@/features/layout/components/Container";
import { BreadCrumb } from "@/features/layout/components/BreadCrumb";

const ChangePassword = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const changePasswordSchema = z
    .object({
      currentPassword: z.string().min(8, {
        message: "Current password is required.",
      }),
      newPassword: z.string().min(8, {
        message: "New password is required.",
      }),
      confirmPassword: z.string().min(8, {
        message: "Confirm password is required.",
      }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof changePasswordSchema>) {
    submit(data, { method: "patch", action: "/change-password" });
  }
  return (
    <section className="container mx-auto my-20">
      <Container>
        <BreadCrumb currentPage="ChangePassword" />
        <h1 className="text-xl font-bold 2xl:text-2xl">Change Password</h1>
        <p className="text-muted-foreground">
          To change your password, please fill in the fields below.
        </p>

        <Card className="mt-8 w-full px-4 pt-4 lg:w-[400px]">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">Current Password</FormLabel>
                      <FormControl>
                        <div className="flex w-full items-center rounded-md border border-gray-300">
                          <PasswordInput
                            className="w-full flex-1 border-none focus-visible:ring-0"
                            placeholder="Current Password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">New Password</FormLabel>
                      <FormControl>
                        <div className="flex w-full items-center rounded-md border border-gray-300">
                          <PasswordInput
                            className="w-full flex-1 border-none focus-visible:ring-0"
                            placeholder="New Password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-1">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="flex w-full items-center rounded-md border border-gray-300">
                          <PasswordInput
                            className="w-full flex-1 border-none focus-visible:ring-0"
                            placeholder="Confirm Password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
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
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default ChangePassword;
