import GenreDetailContent from "@/app/_components/movieDetails/GenreDetailContent";

export default async function MovieGenresPage({
  params,
}: {
  params: Promise<{ movieGenres: string }>;
}) {
  const { movieGenres } = await params;
  return <GenreDetailContent defaultMovieGenres={movieGenres} />;
}
