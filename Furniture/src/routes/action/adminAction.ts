import api from "@/api";
import { AxiosError } from "axios";
import { ActionFunctionArgs } from "react-router";
import { toast } from "sonner";

export const createProductAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  try {
    const response = await api.post("admin/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
