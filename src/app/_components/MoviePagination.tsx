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
import { MovieType } from "@/util/types";
import { useEffect, useState } from "react";
import SearchBar from "../dashboard/search-bar";

export default function MoviePagination({ movieInfo }: { movieInfo: any }) {
  const [page, setPage] = useState(1);

  const moviesPageNum = movieInfo.total_pages;

  const goPrev = () => {
    setPage(page - 1);
  };
  const goNext = () => {
    setPage(page + 1);
  };

  const goPage = (num: number) => {
    setPage(num);
  };

  return (
    <Pagination>
      <PaginationContent>
        {page == 1 ? (
          <div className="flex">
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => goPage(2)}>
                {2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => goPage(3)}>
                {3}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" onClick={goNext} />
            </PaginationItem>
          </div>
        ) : page == 2 ? (
          <div className="flex">
            <PaginationItem>
              <PaginationPrevious href="#" onClick={goPrev} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => goPage(1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => goPage(3)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" onClick={goNext} />
            </PaginationItem>
          </div>
        ) : page > 2 ? (
          <div className="flex">
            <PaginationItem>
              <PaginationPrevious href="#" onClick={goPrev} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => goPage(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive onClick={() => goPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => {
                  goPage(page + 1);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" onClick={goNext} />
            </PaginationItem>
          </div>
        ) : page == moviesPageNum ? (
          <div className="flex">
            <PaginationItem>
              <PaginationPrevious href="#" onClick={goPrev} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => goPage(page - 1)}>
                {page - 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive onClick={() => goPage(page)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => {
                  goPage(page + 1);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </div>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
