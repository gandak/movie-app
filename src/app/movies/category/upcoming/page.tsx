"use client";
import { MovieGenerator } from "@/app/_components/MovieGenerator";
import MoviePagination from "@/app/_components/MoviePagination";
import { fetchData } from "@/util/fetchData";
import { MovieType } from "@/util/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpcomingMoviesPage() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<any>(null);

  const page = Number(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchData(
        `/movie/upcoming?language=en-US&page=${page}`
      );
      setMovies(data);
    };
    fetchMovies();
  }, [page]);

  if (!movies) {
    return null;
  }

  return (
    <div className="max-w-[1280px] w-full flex flex-col items-end m-auto gap-8">
      <div className="flex flex-col gap-8">
        <h1 className="font-semibold text-[30px]">Upcoming</h1>
        <div className="flex flex-wrap gap-8 w-full">
          {movies?.results.map((movie: MovieType, index: number) => {
            return (
              <MovieGenerator
                movieInfo={movie}
                index={index}
                className="w-[230px] h-[439px]"
              />
            );
          })}
        </div>
      </div>
      <div>
        <MoviePagination
          currentPage={Number(page)}
          totalPages={movies.total_pages}
        />
      </div>
    </div>
  );
}
