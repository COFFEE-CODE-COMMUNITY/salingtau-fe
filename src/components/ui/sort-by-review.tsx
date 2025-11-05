import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Star, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// SortByReview Component
interface SortByReviewProps {
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

export function SortByReview({ onSortChange }: SortByReviewProps) {
  const [sortBy, setSortBy] = React.useState("rating");
  const [sortOrder, setSortOrder] = React.useState("descending");

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    onSortChange(value, sortOrder);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    onSortChange(sortBy, value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[140px] justify-between font-normal">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortByChange}>
          <DropdownMenuRadioItem value="rating">
            <Star className="h-4 w-4 mr-2" />
            Rating
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortOrder} onValueChange={handleSortOrderChange}>
          <DropdownMenuRadioItem value="ascending">
            <ArrowUp className="h-4 w-4 mr-2" />
            Ascending
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="descending">
            <ArrowDown className="h-4 w-4 mr-2" />
            Descending
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// FilterReview Component (UI only, no functionality)
export function FilterReview() {
  return (
    <Button variant="outline" className="justify-between font-normal">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filter</span>
      </div>
    </Button>
  );
}