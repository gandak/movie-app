import { Header } from "@/app/_components/Header";
import MovieDetailContent from "@/app/_components/movieDetails/MovieDetailContent";

export default function MovieGenresPage({
  params: { genreId },
}: {
  params: { genreId: number };
}) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px]">
      <h1>Search Filter</h1>

      <div className="flex gap-6 w-full">
        <div className="flex flex-col gap4">
          <div>
            <h2>Genres</h2>
            <p>See lists of movies by genre</p>
          </div>
          <div>genre map</div>
        </div>

        <div className="flex flex-col w-full">
          <h3>34343 movies</h3>
          <div>movies map</div>
        </div>
      </div>
    </div>
  );
}
