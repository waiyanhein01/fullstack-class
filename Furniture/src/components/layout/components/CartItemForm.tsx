"use client";

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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  number: z.string().min(1),
});

const CartItemForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      number: "1",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Add to cart successfully");
    console.log("data", data);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-between"
        >
          <div className="flex max-w-[150px]">
            <Button
              size={"icon"}
              variant="outline"
              className="cursor-pointer rounded-r-none"
            >
              <Icons.MinusIcon className="" />
            </Button>
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      inputMode="numeric"
                      className="border"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size={"icon"}
              variant="outline"
              className="cursor-pointer rounded-l-none"
            >
              <Icons.PlusIcon />
            </Button>
          </div>
          <div className="">
            <Button
              type="submit"
              size={"sm"}
              variant="outline"
              className="cursor-pointer"
            >
              <Icons.TrashIcon
                size={"icon"}
                className="size-4"
                aria-hidden="true"
              />
              <span className="sr-only">Delete Icon</span>
            </Button>
          </div>
        </form>
      </Form>
      <Separator className="my-4" />
    </div>
  );
};

export default CartItemForm;
