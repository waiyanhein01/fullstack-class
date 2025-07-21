import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

const FavouriteIcon = () => {
  return (
    <div>
      <Button variant="outline">
        <Icons.HeartIcon className="fill-red-500 text-red-500" />
      </Button>
    </div>
  );
};

export default FavouriteIcon;
