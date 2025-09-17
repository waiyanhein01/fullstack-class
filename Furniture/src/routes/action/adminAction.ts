import api from "@/api";
import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

export const createProductAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  //   const payload = Object.fromEntries(formData);
  //   console.log(payload, "payload");
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    discount: formData.get("discount"),
    inventory: formData.get("inventory"),
    category: formData.get("category"),
    type: formData.get("type"),
    status: formData.get("status"),
  };

  try {
    const response = await api.post("admin/products", payload);
    console.log(response, "response");
    if (response.status === 201) {
      return toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return toast.error(error.response?.data.message, {
        style: {
          borderLeft: "10px solid #f44336",
          background: "#ffffff",
          color: "#f44336",
        },
      });
    }
  }
};
