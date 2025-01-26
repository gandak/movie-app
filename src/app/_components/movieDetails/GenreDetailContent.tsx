"use client";
import { GenreType } from "@/util/types";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "@/util/fetchData";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MovieGenerator } from "../MovieGenerator";

export default function GenreDetailContent({
  defaultMovieGenres,
}: {
  defaultMovieGenres: string;
}) {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [filterGenres, SetFilterGenres] = useState<string[]>([
    defaultMovieGenres,
  ]);

  useEffect(() => {
    const getAllGenres = async () => {
      try {
        const genres = await fetchData("/genre/movie/list?language=en");
        setGenres(genres.genres);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getAllGenres();
  }, []);

  useEffect(() => {
    const getMoviesData = async () => {
      if (filterGenres.length === 0) {
        try {
          const movies = await fetchData(`/discover/movie`);

          setMovies(movies.results || []);
        } catch (error) {
          console.error("Error", error);
          setMovies([]);
        }
        return;
      }

      try {
        const selectedGenreIds = filterGenres.join(",");
        const moviesData = await fetchData(
          `/discover/movie?language=en&with_genres=${selectedGenreIds}`
        );
        setMovies(moviesData.results);
      } catch (error) {
        console.error("Error", error);
      }
    };

    getMoviesData();
  }, [filterGenres]);

  const handleToggleGroupChange = (selectedGenres: string[]) => {
    SetFilterGenres(selectedGenres);
  };

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
            className="flex flex-wrap gap-4"
          >
            {genres.map((genre: GenreType) => (
              <ToggleGroupItem
                key={genre.id}
                value={genre.id.toString()}
                className={`h-[20px] px-[10px] py-[2px] rounded-lg text-xs font-bold border  ${
                  filterGenres.includes(genre.id.toString())
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {genre.name} <ChevronRight />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col w-[70%] gap-8">
          <h3 className="text-[20px] font-semibold">
            {`${movies.length} titles`}
          </h3>
          <div className="grid grid-cols-4 gap-8">
            {movies.map((movie, index: number) => (
              <MovieGenerator
                index={index}
                movieInfo={movie}
                className="w-[165px] h-[331px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
