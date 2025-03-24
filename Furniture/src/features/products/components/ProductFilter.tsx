import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Category } from "@/types";

interface ProductFilterProps {
  categories: Category[];
  types: Category[];
}
const FormSchema = z.object({
  types: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

// categories,

export function ProductFilter({ types }: ProductFilterProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      types: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="types"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Filter</FormLabel>
                <FormDescription>
                  Select the items you want to filter.
                </FormDescription>
              </div>
              {types.map((type) => (
                <FormField
                  key={type.id}
                  control={form.control}
                  name="types"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={type.id}
                        className="flex flex-row items-start space-y-0 space-x-3"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(type.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, type.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== type.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {type.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
