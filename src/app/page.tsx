import PopularMovies from "@/app/_components/PopularMovies";
import UpcomingMovies from "./_components/UpcomingMovies";
import TopRatedMovies from "./_components/TopRatedMovies";
import NowPlayingMovies from "./_components/NowPlayingMovies";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-screen h-[600px]">
        <NowPlayingMovies />
      </div>
      <div className="max-w-[1438px] flex flex-col justify-center items-center gap-[52px] px-20 pt-[50px]">
        <UpcomingMovies />
        <PopularMovies />
        <TopRatedMovies />
      </div>
    </div>
  );
}
