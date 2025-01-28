import { MovieType } from "@/util/types";
import { MovieGenerator } from "./MovieGenerator";
import { fetchData } from "@/util/fetchData";
import Link from "next/link";

export default async function UpcomingMovies() {
  const upcoming = "/movie/upcoming?language=en-US&page=1";
  const data = await fetchData(upcoming);

  return (
    <div>
      <div className="flex flex-wrap justify-between pb-8">
        <h1 className="font-bold text-[24px]">Upcoming</h1>
        <Link href="/movies/category/upcoming" className="hover:underline">
          See more →
        </Link>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {data.results?.slice(0, 10).map((movie: MovieType, index: number) => {
          return (
            <div key={index}>
              <MovieGenerator
                movieInfo={movie}
                className="w-[230px] h-[439px]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
