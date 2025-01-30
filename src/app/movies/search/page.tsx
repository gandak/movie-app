"use client";
import { MovieGenerator } from "@/app/_components/MovieGenerator";
import MoviePagination from "@/app/_components/MoviePagination";
import { fetchData } from "@/util/fetchData";
import { GenreType, Movie, MovieType } from "@/util/types";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { ChevronRight, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") || "1");
  const getSearchValue = searchParams.get("searchValue");

  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie>();
  const [filteredMovies, setFilteredMovies] = useState<Movie>();
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [filterGenres, SetFilterGenres] = useState<string[]>([]);

  useEffect(() => {
    setSearchValue(getSearchValue || "");
  }, [getSearchValue]);

  useEffect(() => {
    const getAllGenres = async () => {
      const genres = await fetchData("/genre/movie/list?language=en");
      setGenres(genres.genres || []);
    };
    getAllGenres();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      const getFirstSearchValue = JSON.stringify(
        searchParams.get("searchValue")
      );

      setSearchValue(getFirstSearchValue);

      const data = await fetchData(
        `/search/movie?query=${searchValue}&language=en-US&page=${page}`
      );

      setMovies(data);
    };
    fetchMovie();
  }, [searchValue, page]);

  const handleToggleGroupChange = (selectedGenres: string[]) => {
    SetFilterGenres(selectedGenres);
    router.push(
      `/movies/search/?searchValue=${getSearchValue}&genreIds=${selectedGenres.join(
        ","
      )}`
    );
  };

  useEffect(() => {
    if (filterGenres && filterGenres.length > 0) {
      const genreFilteredMovies = movies?.results.filter((movie: MovieType) => {
        return filterGenres.some((id) =>
          movie.genre_ids.includes(Number(id) as never)
        );
      });

      setFilteredMovies(genreFilteredMovies as never);
    } else {
      setFilteredMovies(movies);
    }
  }, [filterGenres, movies]);

  if (!movies) {
    return null;
  }

  return (
    <div className="flex max-w-[1280px] w-full justify-center flex-col gap-8 m-auto">
      <h1 className="text-[30px] font-semibold">Search results</h1>
      <div className="w-full flex">
        <div className="w-[70%] flex flex-col gap-8">
          <h2 className="text-[20px] font-semibold">
            {movies?.total_results} results for {searchValue}
          </h2>
          <div className="flex flex-wrap gap-12">
            {filteredMovies?.results.map((movie: MovieType, index: number) => {
              return (
                <div key={index}>
                  <MovieGenerator
                    movieInfo={movie}
                    className="w-[165px] h-[331px]"
                  />
                </div>
              );
            })}
          </div>
          <div>
            <MoviePagination
              currentPage={Number(page)}
              totalPages={movies.total_pages || 1}
            />
          </div>
        </div>

        <div className="w-[30%]">
          <div className="flex flex-col gap-4 w-full">
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
              {genres.map((genre: GenreType) => (
                <ToggleGroupItem
                  key={genre.id}
                  value={genre.id.toString()}
                  className={`h-[20px] px-[10px] py-[2px] rounded-lg text-xs font-bold border flex items-center ${
                    filterGenres?.includes(genre.id.toString())
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {genre.name}{" "}
                  {filterGenres?.includes(genre.id.toString()) ? (
                    <X className="w-[16px]" />
                  ) : (
                    <ChevronRight className="w-[16px]" />
                  )}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
