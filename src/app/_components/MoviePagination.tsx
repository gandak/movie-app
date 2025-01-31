"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function MoviePagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchValue = searchParams.get("searchValue");
  const genreIds = searchParams.get("genreIds");

  const goToPage = (page: number) => {
    {
      searchValue == null
        ? router.push(`?page=${page}`)
        : genreIds == null
        ? router.push(`?searchValue=${searchValue}&page=${page}`)
        : router.push(
            `?searchValue=${searchValue}&genreIds=${genreIds}&page=${page}`
          );
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => goToPage(currentPage - 1)}
            />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => goToPage(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages && totalPages > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => goToPage(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage == 1 && totalPages > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => goToPage(currentPage + 2)}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 1 && totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => goToPage(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
