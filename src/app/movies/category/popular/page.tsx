import { MovieGenerator } from "@/app/_components/MovieGenerator";
import MoviePagination from "@/app/_components/MoviePagination";
import SearchBar from "@/app/dashboard/search-bar";
import { Pagination } from "@/components/ui/pagination";
import { fetchData } from "@/util/fetchData";

export default async function PopularMoviesPage() {
  const movies = await fetchData("/movie/popular?language=en-US&page=1");

  return (
    <div className="max-w-[1280px] w-full flex flex-col  m-auto gap-8">
      <h1 className="font-semibold text-[30px]">Popular</h1>
      <div className="flex flex-wrap gap-8 w-full">
        {movies?.results.map((movie) => {
          return (
            <MovieGenerator movieInfo={movie} className="w-[230px] h-[439px]" />
          );
        })}
      </div>
      <div>
        <MoviePagination movieInfo={movies} />
      </div>
    </div>
  );
}
