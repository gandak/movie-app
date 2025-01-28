import MovieDetailContent from "@/app/_components/movieDetails/MovieDetailContent";

export default function MovieDetailPage({
  params,
}: {
  params: { movieDetail: string };
}) {
  const { movieDetail } = params;
  return (
    <div className="flex justify-center">
      <MovieDetailContent id={movieDetail} />
    </div>
  );
}
