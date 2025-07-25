import api from "@/api";
import { queryClient } from "@/api/query";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useIsFetching, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface FavouriteIconProps {
  productId: number;
  isFavourite: boolean;
}

const FavouriteIcon = ({ productId, isFavourite }: FavouriteIconProps) => {
  let favourite = isFavourite;
  const fetching = useIsFetching() > 0;
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      // Perform the mutation (e.g., API call)
      const data = {
        productId: +productId,
        favourite: !isFavourite,
      };

      const response = await api.patch(
        "dashboard/products/favourite-toggle",
        data,
      );

      if (response.status !== 200) {
        toast.error(response.data.message, {
          style: {
            borderLeft: "10px solid #f44336",
            background: "#ffffff",
            color: "#333333",
          },
        });
      } else {
        toast.success(response.data.message, {
          style: {
            borderLeft: "10px solid #4caf50",
            background: "#ffffff",
            color: "#333333",
          },
        });
      }
      return response.data;
    },
    // onSuccess: () => {
    //   toast.success("Favourite updated successfully");
    // },
    // onError: (error: any) => {
    //   toast.error(error.message || "Failed to update favourite");
    // },

    onSettled: () => {
      // Optionally, you can invalidate queries or perform other actions after mutation
      queryClient.invalidateQueries({
        queryKey: ["products", "detail", productId],
      });
    },
  });

  if (fetching || isPending) {
    favourite = !isFavourite; // Optimistically update the UI
  }

  return (
    <Button
      variant="outline"
      onClick={() => mutate()}
      title={favourite ? "Remove from favourite" : "Add to favourite"}
    >
      <Icons.HeartIcon
        className={` ${favourite ? "fill-red-500 text-red-500" : "text-red-500"}`}
      />
    </Button>
  );
};

export default FavouriteIcon;
