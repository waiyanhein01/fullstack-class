import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "./Icons";

const EmailSchema = z.object({
  email: z.string({
    message: "Username must be at least 2 characters.",
  }),
});

const EmailInput = () => {
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof EmailSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <div className="border border-slate-300 rounded-md flex p-1">
              <FormLabel className="sr-only">Username</FormLabel>
              <FormControl className="">
                <Input placeholder="example@gmail.com" {...field} className="" />
              </FormControl>

              <Button size={"icon"} className="" aria-hidden="true">
                <Icons.SendIcon aria-hidden="true"/>
              </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EmailInput;
