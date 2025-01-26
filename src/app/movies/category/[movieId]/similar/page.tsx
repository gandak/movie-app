import { MovieGenerator } from "@/app/_components/MovieGenerator";
import { fetchData } from "@/util/fetchData";

export default async function SimilarMoviesPage({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;
  console.log(movieId);
  const movies = await fetchData(
    `/movie/${movieId}/similar?language=en-US&page=1`
  );

  return (
    <div className="max-w-[1280px] w-full flex flex-col  m-auto gap-8">
      <h1 className="font-semibold text-[30px]">More Like This</h1>
      <div className="flex flex-wrap gap-8 w-full">
        {movies?.results.map((movie: any) => {
          return (
            <MovieGenerator movieInfo={movie} className="w-[230px] h-[439px]" />
          );
        })}
      </div>
    </div>
  );
}
