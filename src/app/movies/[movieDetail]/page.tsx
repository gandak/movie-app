import MovieDetailContent from "@/app/_components/movieDetails/MovieDetailContent";

export default function MovieDetailPage({
  params,
}: {
  params: { movieDetail: string };
}) {
  return (
    <div className="flex justify-center">
      <MovieDetailContent id={params.movieDetail} />
    </div>
  );
}
