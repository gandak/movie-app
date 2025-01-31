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
  const getSearchValue = searchParams.get("searchValue") || "";

  console.log(page);

  const [movies, setMovies] = useState<Movie | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [filterGenres, setFilterGenres] = useState<string[]>([]);

  useEffect(() => {
    const getAllGenres = async () => {
      const genres = await fetchData("/genre/movie/list?language=en");
      setGenres(genres.genres || []);
    };
    getAllGenres();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetchData(
        `/search/movie?query=${getSearchValue}&language=en-US&page=${page}`
      );
      setMovies(data);
      // setFilteredMovies(data);
      console.log(getSearchValue);
    };
    fetchMovie();
  }, [getSearchValue, page]);

  const handleToggleGroupChange = (selectedGenres: string[]) => {
    setFilterGenres(selectedGenres);
    selectedGenres.length > 0
      ? router.push(
          `/movies/search/?searchValue=${getSearchValue}&genreIds=${selectedGenres}`
        )
      : router.push(`/movies/search/?searchValue=${getSearchValue}`);
  };

  useEffect(() => {
    if (filterGenres.length > 0 && movies) {
      const genreFilteredMovies = movies.results.filter((movie: MovieType) =>
        filterGenres.some((id) => movie.genre_ids.includes(Number(id) as never))
      );

      setFilteredMovies({ ...movies, results: genreFilteredMovies });
    } else {
      setFilteredMovies(movies);
    }
  }, [filterGenres, movies]);

  if (!movies) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex max-w-[1280px] w-full justify-center flex-col gap-8 m-auto">
      <h1 className="text-[30px] font-semibold">Search results</h1>
      <div className="w-full flex">
        <div className="w-[70%] flex flex-col gap-8">
          <h2 className="text-[20px] font-semibold">
            {movies?.total_results} results for {getSearchValue}
          </h2>
          <div className="flex flex-wrap gap-12">
            {filteredMovies?.results?.length ? (
              filteredMovies.results.map((movie: MovieType, index: number) => (
                <MovieGenerator
                  key={index}
                  movieInfo={movie}
                  className="w-[165px] h-[331px]"
                />
              ))
            ) : (
              <p className="text-gray-500">No movies found.</p>
            )}
          </div>
          <div>
            <MoviePagination
              currentPage={page}
              totalPages={movies.total_pages || 1}
            />
          </div>
        </div>

        <div className="w-[30%]">
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-[24px] font-semibold">Genres</h2>
            <p>See lists of movies by genre</p>
            <ToggleGroup
              type="multiple"
              value={filterGenres}
              onValueChange={handleToggleGroupChange}
              className="flex flex-wrap gap-4 justify-start"
            >
              {genres.map((genre) => (
                <ToggleGroupItem
                  key={genre.id}
                  value={genre.id.toString()}
                  className={`h-[20px] px-[10px] py-[2px] rounded-lg text-xs font-bold border flex items-center ${
                    filterGenres.includes(genre.id.toString())
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
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
