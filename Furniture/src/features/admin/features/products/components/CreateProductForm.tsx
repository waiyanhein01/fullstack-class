import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useSubmit } from "react-router";

const MAX_FILE_SIZE = 5000000;
const MAX_FILES = 5;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  price: z.string().min(1, {
    message: "Price input is invalid.",
  }),
  discount: z.string().min(1, {
    message: "Discount input is invalid.",
  }),
  inventory: z.string().min(1, {
    message: "Inventory input is invalid.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  type: z.string({
    required_error: "Please select a type.",
  }),
  description: z
    .string()
    .min(10, {
      message: "description must be at least 10 characters.",
    })
    .max(160, {
      message: "description must not be longer than 160 characters.",
    }),
  images: z
    .instanceof(FileList)
    .refine((files) => files?.length > 0, "At least one image is required.")
    .refine(
      (files) => files?.length <= MAX_FILES,
      `Maximum of ${MAX_FILES} images are allowed.`,
    )
    .refine((files) => {
      // Check file sizes
      return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
    }, `Each file size should be less than 5MB.`)
    .refine((files) => {
      // Check file types
      return Array.from(files).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      );
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

const CreateProductForm = () => {
  const submit = useSubmit();
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: "",
      discount: "",
      //   status: "",
      inventory: "",
      images: undefined,
    },
  });

  const { watch, setValue } = form;
  const watchedFiles = watch("images");

  useEffect(() => {
    if (!watchedFiles || watchedFiles.length === 0) {
      setPreviews([]);
      return;
    }

    const newPreviews = Array.from(watchedFiles).map((file) =>
      URL.createObjectURL(file),
    );
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [watchedFiles]);

  const handleRemoveFile = (indexToRemove: number) => {
    const currentFiles = watchedFiles ? Array.from(watchedFiles) : [];
    const updatedFiles = currentFiles.filter(
      (_, index) => index !== indexToRemove,
    );

    // Create a new FileList
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));

    setValue("images", dataTransfer.files, { shouldValidate: true });
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("inventory", data.inventory);
    formData.append("category", data.category);
    formData.append("type", data.type);
    formData.append("description", data.description);

    // Append images one by one
    Array.from(data.images).forEach((file) => {
      formData.append("images", file); // same field name for multiple files
    });

    submit(formData, {
      method: "post",
      action: ".",
      encType: "multipart/form-data", // very important for files
    });
  }

  return (
    <div className="w-full rounded-lg border p-5 lg:w-[500px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter discount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inventory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventory</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter inventory"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Images</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      id="file-upload"
                      multiple
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files)}
                      accept="image/jpeg,image/png,image/webp"
                    />
                    <label
                      htmlFor="file-upload"
                      className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 ${
                        previews.length > 0 ? "border-primary" : ""
                      }`}
                    >
                      {previews.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                          {previews.map((src, index) => (
                            <div key={src} className="relative h-32 w-full">
                              <img
                                src={src}
                                alt={`Preview ${index + 1}`}
                                className="h-full w-full rounded-md object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveFile(index);
                                }}
                              >
                                &times;
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, WEBP (MAX 5 files, 5MB each)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="wooden">Wooden</SelectItem>
                    <SelectItem value="bamboo">Bamboo</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="seating">Seating</SelectItem>
                    <SelectItem value="lying">Lying</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="tables">Tables</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductForm;
