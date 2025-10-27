"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function PaginationControls({ currentPage, totalPages, currentLimit }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (page, limit) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    params.set("limit", limit);
    router.push(`?${params.toString()}`); // ⬅ triggers SSR re-fetch
  };

  const handlePageIncrease = () => {
    if (currentPage < totalPages) updateParams(currentPage + 1, currentLimit);
  };

  const handlePageDecrease = () => {
    if (currentPage > 1) updateParams(currentPage - 1, currentLimit);
  };

  const handleLimitChange = (newLimit) => {
    updateParams(1, newLimit); // reset to page 1 when limit changes
  };

  return (
    <div className="flex items-center justify-end w-full pr-4 gap-x-4">
      <Select value={currentLimit.toString()} onValueChange={handleLimitChange}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="select-none cursor-pointer"
                onClick={handlePageDecrease}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink>{totalPages || 1}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className="select-none cursor-pointer"
                onClick={handlePageIncrease}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
