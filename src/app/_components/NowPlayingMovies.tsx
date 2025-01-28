import { MovieType } from "@/util/types";
import { fetchData } from "@/util/fetchData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

import { TrailerButton } from "./TrailerButton";
import Image from "next/image";

export default async function NowPlayingMovies() {
  const nowPlaying = "/movie/now_playing?language=en-US&page=1";

  const data = await fetchData(nowPlaying);

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
                  <div className="absolute flex flex-col w-[404px] gap-4 text-white left-[150px] top-[180px]">
                    <div>
                      <p className="text-4">Now Playing:</p>
                      <h1 className="text-[30px] font-bold">{movie.title}</h1>
                      <div className="flex items-center">
                        <Image src="/star.svg" alt="" width={28} height={28} />

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
                      <TrailerButton id={movie.id} />
                    </div>
                  </div>
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
