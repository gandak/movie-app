import MovieDetailContent from "@/app/_components/movieDetails/MovieDetailContent";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ movieDetail: string }>;
}) {
  const { movieDetail } = await params;

  return (
    <div className="flex justify-center">
      <MovieDetailContent id={movieDetail} />
    </div>
  );
}
