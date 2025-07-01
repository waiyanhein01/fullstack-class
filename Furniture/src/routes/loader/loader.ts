import api from "@/api";

export const homeLoader = async () => {
  try {
    const response = await api.get("dashboard/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
};
