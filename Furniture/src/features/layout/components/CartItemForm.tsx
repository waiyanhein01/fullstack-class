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
import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";

interface CartItemFormProps {
  onUpdate: (quantity: number) => void;
  onRemove: () => void;
  quantity: number;
}

const FormSchema = z.object({
  quantity: z
    .string()
    .min(1, "Quantity must be at least 1")
    .regex(/^\d+$/, "Quantity must be a number"),
});

const CartItemForm = ({ onUpdate, onRemove, quantity }: CartItemFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantity: quantity.toString(),
    },
  });

  const { setValue } = form;
  const currentQuantity = form.watch("quantity");

  const handleIncrease = () => {
    const newQuantity = Math.max(Number(currentQuantity) + 1);
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
    onUpdate(newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(Number(currentQuantity) - 1, 1);
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
    onUpdate(newQuantity);
  };

  return (
    <div>
      <Form {...form}>
        <form className="flex items-center justify-between">
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
          <div className="">
            <Button
              onClick={onRemove}
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
