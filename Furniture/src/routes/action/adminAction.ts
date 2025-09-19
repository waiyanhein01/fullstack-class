import api from "@/api";
import { AxiosError } from "axios";
import { ActionFunctionArgs, redirect } from "react-router";
import { toast } from "sonner";
import { queryClient } from "@/api/query";

export const createProductAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  try {
    const response = await api.post("admin/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
      // Invalidate products queries so UI updates automatically
      await queryClient.invalidateQueries({ queryKey: ["products", "admin"] });
      return redirect("/admin/products");
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

export const editProductAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const productId = formData.get("productId");
  if (!productId) {
    return toast.error("Product id not found", {
      style: {
        borderLeft: "10px solid #f44336",
        background: "#ffffff",
        color: "#f44336",
      },
    });
  }

  try {
    const response = await api.patch(
      `admin/products/${productId.toString()}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (response.status === 200) {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["products", "admin"] });
      return redirect("/admin/products");
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

export const deleteProductAction = async ({
  productId,
}: {
  productId: string;
}) => {
  try {
    const response = await api.delete(`admin/products/${productId}`);
    if (response.status === 200) {
      toast.success(response.data.message, {
        style: {
          borderLeft: "10px solid #4caf50",
          background: "#ffffff",
          color: "#4caf50",
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["products", "admin"] });
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
