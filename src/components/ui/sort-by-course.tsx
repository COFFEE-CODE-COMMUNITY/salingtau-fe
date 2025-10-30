import * as React from "react"
import { ArrowUpDown, ArrowUp, ArrowDown, Type, DollarSign, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SortByCourseProps {
  onSortChange: (sortBy: string, sortOrder: string) => void
}

export function SortByCourse({ onSortChange }: SortByCourseProps) {
  const [sortBy, setSortBy] = React.useState("name")
  const [sortOrder, setSortOrder] = React.useState("ascending")

  const handleSortByChange = (value: string) => {
    setSortBy(value)
    onSortChange(value, sortOrder)
  }

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value)
    onSortChange(sortBy, value)
  }

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
          <DropdownMenuRadioItem value="name">
            <Type className="h-4 w-4 mr-2" />
            Name
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price">
            <DollarSign className="h-4 w-4 mr-2" />
            Price
          </DropdownMenuRadioItem>
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
  )
}