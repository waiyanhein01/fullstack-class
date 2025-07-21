import { Icons } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const WhiteListHeart = () => {
  const totalCarts = 3;
  return (
    <div>
      <Button variant="outline" className="relative">
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 size-5 rounded-full text-sm"
        >
          {totalCarts}
        </Badge>
        <Icons.HeartIcon className="size-4" aria-hidden="true" />
        <span className="sr-only">Heart Icon</span>
      </Button>
    </div>
  );
};

export default WhiteListHeart;
