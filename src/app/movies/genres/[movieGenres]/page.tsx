import { use } from "react";
import GenreDetailContent from "@/app/_components/movieDetails/GenreDetailContent";

export default function MovieGenresPage({
  params: { movieGenres },
}: {
  params: { movieGenres: string };
}) {
  // const { defaultMovieGenres } = use(movieGenres);

  return <GenreDetailContent defaultMovieGenres={movieGenres} />;
}
