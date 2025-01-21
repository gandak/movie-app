import PopularMovies from "@/app/_components/PopularMovies";
import UpcomingMovies from "./_components/UpcomingMovies";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <UpcomingMovies />
      <PopularMovies />
    </div>
  );
}
