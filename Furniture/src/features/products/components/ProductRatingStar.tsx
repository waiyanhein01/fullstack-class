import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
}

const ProductRatingStar = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }, (_, index) => (
        <Icons.StarIcon
          key={index}
          className={cn("size-5", rating >= index + 1 ? "text-amber-300" : "text-muted-foreground ")}
        />
      ))}
    </div>
  );
};

export default ProductRatingStar;
