import MovieDetailContent from "@/app/_components/movieDetails/MovieDetailContent";

export default function MovieDetailPage({
  params: { movieDetail },
}: {
  params: { movieDetail: string };
}) {
  return (
    <div className="flex justify-center">
      <MovieDetailContent id={movieDetail} />
    </div>
  );
}
