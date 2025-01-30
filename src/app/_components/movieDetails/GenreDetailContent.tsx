"use client";
import { GenreType, Movie, MovieType } from "@/util/types";
import { ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "@/util/fetchData";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MovieGenerator } from "../MovieGenerator";
import MoviePagination from "../MoviePagination";
import { useSearchParams } from "next/navigation";

export default function GenreDetailContent({
  defaultMovieGenres,
}: {
  defaultMovieGenres: string;
}) {
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [movies, setMovies] = useState<Movie>();
  const [filterGenres, SetFilterGenres] = useState<string[]>([
    defaultMovieGenres,
  ]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    setPage(pageParam);
  }, [searchParams]);

  useEffect(() => {
    const getAllGenres = async () => {
      const genres = await fetchData("/genre/movie/list?language=en");
      setGenres(genres.genres);
    };
    getAllGenres();
  }, []);

  useEffect(() => {
    const getMoviesData = async () => {
      let apiUrl = `/discover/movie?language=en&page=${page}`;

      if (filterGenres.length > 0) {
        const selectedGenreIds = filterGenres.join(",");
        apiUrl = apiUrl + `&with_genres=${selectedGenreIds}`;
      }
      const moviesData = await fetchData(apiUrl);
      setMovies(moviesData);
    };

    getMoviesData();
  }, [filterGenres, page]);

  const handleToggleGroupChange = (selectedGenres: string[]) => {
    SetFilterGenres(selectedGenres);
  };

  if (!movies) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] m-auto">
      <h1 className="text-[30px] font-semibold">Search Filter</h1>

      <div className="flex gap-6 w-full">
        <div className="flex flex-col gap-4 w-[30%]">
          <div>
            <h2 className="text-[24px] font-semibold">Genres</h2>
            <p>See lists of movies by genre</p>
          </div>
          <ToggleGroup
            type="multiple"
            value={filterGenres}
            onValueChange={handleToggleGroupChange}
            className="flex flex-wrap gap-4 justify-start"
          >
            {genres.map((genre: GenreType, index: number) => (
              <div key={index}>
                <ToggleGroupItem
                  key={genre.id}
                  value={genre.id.toString()}
                  className={`h-[20px] px-[10px] py-[2px] rounded-lg text-xs font-bold border  ${
                    filterGenres?.includes(genre.id.toString())
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {genre.name}{" "}
                  {filterGenres.includes(genre.id.toString()) ? (
                    <X className="w-[16px]" />
                  ) : (
                    <ChevronRight className="w-[16px]" />
                  )}
                </ToggleGroupItem>
              </div>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col w-[70%] gap-8">
          <h3 className="text-[20px] font-semibold">
            {`${movies?.total_results} titles`}
          </h3>
          <div className="grid grid-cols-4 gap-8">
            {movies?.results.map((movie: MovieType, index: number) => (
              <div key={index}>
                <MovieGenerator
                  movieInfo={movie}
                  className="w-[165px] h-[331px]"
                />
              </div>
            ))}
          </div>
          <MoviePagination
            currentPage={Number(page)}
            totalPages={movies.total_pages}
          />
        </div>
      </div>
    </div>
  );
}
