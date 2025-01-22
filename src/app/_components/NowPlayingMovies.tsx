import { MovieType } from "@/util/types";
import { fetchData } from "@/util/fetchData";
import { fetchTrailer } from "@/util/fetchTrailer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default async function NowPlayingMovies() {
  const nowPlaying = "/movie/now_playing?language=en-US&page=1";

  const data = await fetchData(nowPlaying);
  // console.log(data);

  const dataTrailer = await fetchTrailer(762509);
  const videoTrailer = `https://www.youtube.com/watch?v=${dataTrailer?.results[0].key}`;

  return (
    <Carousel className="w-full h-full">
      <CarouselContent>
        {data.results?.slice(0, 5).map((movie: MovieType, index: number) => {
          const imgUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

          return (
            <CarouselItem key={index}>
              <div
                className="h-[600px] bg-cover bg-center flex "
                style={{
                  backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
                }}
              >
                <Card className="relative ">
                  {/* <CardContent className=" h-[600px] flex items-center justify-center p-6"> */}
                  <div className="absolute flex flex-col w-[404px] gap-4 text-white left-[150px] top-[180px]">
                    <div>
                      <p className="text-4">Now Playing:</p>
                      <h1 className="text-[30px] font-bold">{movie.title}</h1>
                      <div className="flex items-center">
                        <img
                          src="/star.svg"
                          alt=""
                          className="w-[28px] h-[28px]"
                        />

                        <div className="flex items-center">
                          <p className="text-[18px] font-semibold">
                            {movie.vote_average.toFixed(1)}
                          </p>
                          <p className="text-4 text-[#71717A]">/10</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-[12px]">{movie?.overview}</p>
                    </div>
                    <div>
                      <a href={videoTrailer} target="_blank">
                        <button className="flex items-center bg-white px-6 py-2 rounded-lg gap-2 text-black">
                          <div className="w-4 h-4 flex justify-center items-center pt-[1px]">
                            <img src="/play.svg" alt="" />
                          </div>

                          <p className="text-[14px] font-medium">
                            Watch Trailer
                          </p>
                        </button>
                      </a>
                    </div>
                  </div>
                  {/* </CardContent> */}
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10" />
      <CarouselNext className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full" />
    </Carousel>
  );
}

{
  /* <div className="w-full h-full">
  {data.results?.slice(1, 2).map((movie: MovieType) => {
    const imgUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    return (
      <div
        className="w-full h-full bg-cover bg-center flex items-center"
        style={{
          backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
        }}
      >
        <div className="absolute flex flex-col w-[404px] gap-4 text-white left-[150px]">
          <div>
            <p className="text-4">Now Playing:</p>
            <h1 className="text-[30px] font-bold">{movie.title}</h1>
            <div className="flex items-center">
              <img src="/star.svg" alt="" className="w-[28px] h-[28px]" />

              <div className="flex items-center">
                <p className="text-[18px] font-semibold">
                  {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-4 text-[#71717A]">/10</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[12px]">{movie?.overview}</p>
          </div>
          <div>
            <a href={videoTrailer} target="_blank">
              <button className="flex items-center bg-white px-6 py-2 rounded-lg gap-2 text-black">
                <div className="w-4 h-4 flex justify-center items-center pt-[1px]">
                  <img src="/play.svg" alt="" />
                </div>

                <p className="text-[14px] font-medium">Watch Trailer</p>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  })}
</div>; */
}
