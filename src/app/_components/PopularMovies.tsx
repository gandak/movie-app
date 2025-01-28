import { MovieType } from "@/util/types";
import { MovieGenerator } from "./MovieGenerator";
import { fetchData } from "@/util/fetchData";
import Link from "next/link";

export default async function PopularMovies() {
  const popular = "/movie/popular?language=en-US&page=1";

  const data = await fetchData(popular);

  return (
    <div>
      <div className="flex flex-wrap justify-between pb-8">
        <h1 className="font-bold text-[24px]">Popular</h1>
        <Link href="/movies/category/popular" className="hover:underline">
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
