import { MovieType } from "@/util/types";
import { MovieGenerator } from "./MovieGenerator";
import { fetchData } from "@/util/fetchData";

export default async function TopRatedMovies() {
  const topRated = "/movie/top_rated?language=en-US&page=1";

  const data = await fetchData(topRated);

  return (
    <div>
      <div className="flex flex-wrap justify-between pb-8">
        <h1 className="font-bold text-[24px]">Top Rated</h1>
        <a href="">See more →</a>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {data.results?.slice(0, 10).map((movie: MovieType) => {
          return (
            <MovieGenerator movieInfo={movie} className="w-[230px] h-[439px]" />
          );
        })}
      </div>
    </div>
  );
}
