import { Header } from "@/app/_components/Header";
import MovieDetailContent from "@/app/_components/movieDetails/MovieDetailContent";

export default function MovieDetailPage({
  params: { movieDetail },
}: {
  params: { movieDetail: string };
}) {
  return (
    <div>
      <Header />
      <MovieDetailContent id={movieDetail} />
    </div>
  );
}
