import MovieDetailContent from "@/app/_components/movieDetails/MovieDetailContent";
import { MovieId } from "@/util/types";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ movieDetail: MovieId }>;
}) {
  const { movieDetail } = await params;

  return (
    <div className="flex justify-center">
      <MovieDetailContent id={movieDetail} />
    </div>
  );
}
