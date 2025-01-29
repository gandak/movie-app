import MovieDetailContent from "@/app/_components/movieDetails/MovieDetailContent";

type Params = Promise<{ slug: string[] }>;

export default async function MovieDetailPage({
  params,
}: {
  params: { movieDetail: string };
}) {
  const { movieDetail } = await params;
  return (
    <div className="flex justify-center">
      <MovieDetailContent id={movieDetail} />
    </div>
  );
}
