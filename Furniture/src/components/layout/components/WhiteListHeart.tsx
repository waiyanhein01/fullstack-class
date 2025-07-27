import { Icons } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Link } from "react-router";

interface WhiteListHeartProps {
  favProducts: Product[];
}
const WhiteListHeart = ({ favProducts }: WhiteListHeartProps) => {
  return (
    <div>
      <Link to="/products/favourite">
        <Button variant="outline" className="relative">
          {favProducts.length > 0 ? (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 size-5 rounded-full text-sm"
            >
              {favProducts.length}
            </Badge>
          ) : (
            ""
          )}

          <Icons.HeartIcon className="size-4" aria-hidden="true" />
          <span className="sr-only">Heart Icon</span>
        </Button>
      </Link>
    </div>
  );
};

export default WhiteListHeart;
