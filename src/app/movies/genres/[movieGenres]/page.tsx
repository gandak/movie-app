import GenreDetailContent from "@/app/_components/movieDetails/GenreDetailContent";

export default function MovieGenresPage({
  params: { movieGenres },
}: {
  params: { movieGenres: string };
}) {
  return <GenreDetailContent defaultMovieGenres={movieGenres} />;
}
