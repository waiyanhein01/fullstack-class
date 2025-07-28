import { useEffect } from "react";
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
import { useCartStore } from "@/store/cartStore";

const FormSchema = z.object({
  quantity: z
    .string()
    .min(1, "Quantity must be at least 1")
    .regex(/^\d+$/, "Quantity must be a number"),
});

interface AddToCartFormProps {
  buyNowDisabled?: boolean;
  productId: number;
  handleAddToCart: (quantity: number) => void;
}

export function AddToCartForm({
  buyNowDisabled,
  productId,
  handleAddToCart,
}: AddToCartFormProps) {
  const { carts } = useCartStore();
  const existingItem = carts.find((item) => item.id === productId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantity: existingItem ? existingItem.quantity.toString() : "1",
    },
  });

  const { setValue } = form;
  const currentQuantity = form.watch("quantity");

  const handleIncrease = () => {
    const newQuantity = Math.max(Number(currentQuantity) + 1);
    setValue("quantity", newQuantity.toString());
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(Number(currentQuantity) - 1, 1);
    setValue("quantity", newQuantity.toString());
  };

  useEffect(() => {
    if (existingItem) {
      setValue("quantity", existingItem.quantity.toString(), {
        shouldValidate: true,
      });
    } else {
      setValue("quantity", "1", {
        shouldValidate: true,
      });
    }
  }, [existingItem, setValue]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleAddToCart(Number(data.quantity));
    toast.success(`${existingItem ? "Updated" : "Added"} to cart`, {
      style: {
        borderLeft: "10px solid #4caf50",
        background: "#ffffff",
        color: "#333333",
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex max-w-[120px]">
          <Button
            onClick={handleDecrease}
            type="button"
            size={"icon"}
            variant="outline"
            className="cursor-pointer rounded-r-none border-neutral-500"
            disabled={Number(currentQuantity) === 1}
          >
            <Icons.MinusIcon className="" />
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    min={1}
                    inputMode="numeric"
                    className="pointer-events-none border border-neutral-500 text-center"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={handleIncrease}
            type="button"
            size={"icon"}
            variant="outline"
            className="cursor-pointer rounded-l-none border-neutral-500"
          >
            <Icons.PlusIcon />
          </Button>
        </div>
        <div className="space-x-2.5">
          <Button
            type="button"
            disabled={buyNowDisabled}
            className={` ${buyNowDisabled ? "bg-slate-400" : "btn-primary"} px-4 py-2 text-sm`}
          >
            Buy now
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="cursor-pointer px-4 py-2 text-sm"
          >
            {existingItem ? "Update cart" : "Add to cart"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
