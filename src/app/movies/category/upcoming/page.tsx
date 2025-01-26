import { MovieGenerator } from "@/app/_components/MovieGenerator";
import { fetchData } from "@/util/fetchData";

export default async function UpcomingMoviesPage() {
  const movies = await fetchData("/movie/upcoming?language=en-US&page=1");

  return (
    <div className="max-w-[1280px] w-full flex flex-col  m-auto gap-8">
      <h1 className="font-semibold text-[30px]">Upcoming</h1>
      <div className="flex flex-wrap gap-8 w-full">
        {movies?.results.map((movie) => {
          return (
            <MovieGenerator movieInfo={movie} className="w-[230px] h-[439px]" />
          );
        })}
      </div>
    </div>
  );
}
