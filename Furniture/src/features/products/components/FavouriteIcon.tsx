import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useFetcher } from "react-router";

interface FavouriteIconProps {
  productId: number;
  isFavourite: boolean;
}

const FavouriteIcon = ({ productId, isFavourite }: FavouriteIconProps) => {
  const fetcher = useFetcher({ key: `products:${productId}` });

  // optimistic UI update
  let favourite = isFavourite;
  if (fetcher.formData) {
    favourite = fetcher.formData.get("favourite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <Button
        variant="outline"
        name="favourite"
        value={favourite ? "false" : "true"}
        title={favourite ? "Remove from favourite" : "Add to favourite"}
      >
        <Icons.HeartIcon
          className={` ${favourite ? "fill-red-500 text-red-500" : "text-red-500"}`}
        />
      </Button>
    </fetcher.Form>
  );
};

export default FavouriteIcon;
