import { fetchData } from "@/util/fetchData";
import {
  CastType,
  CrewType,
  GenreType,
  MovieId,
  MovieType,
} from "@/util/types";
import Image from "next/image";
import { MovieGenerator } from "../MovieGenerator";
import { TrailerButton } from "../TrailerButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function MovieDetailContent(movieIdParam: MovieId) {
  const movieId = movieIdParam.id;
  const selectedMovie = await fetchData(`/movie/${movieId}?language=en-US`);
  const casts = await fetchData(`/movie/${movieId}/credits?language=en-US`);
  const moreLikeThis = await fetchData(
    `/movie/${movieId}/similar?language=en-US&page=1`
  );

  const bgImgUrl = `https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`;

  return (
    <div className="max-w-[1068px] w-full flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-[36px] font-bold">
            {selectedMovie.original_title}
          </h1>
          <div className="flex gap-1 text-[18px]">
            <p>{selectedMovie.release_date}</p> <p>·</p>
            <p>{!selectedMovie.adult ? "PG" : "R"}</p> ·
            <p>
              {Math.floor(selectedMovie.runtime / 60)}h{" "}
              {Math.floor(selectedMovie.runtime % 60)}m
            </p>
          </div>
        </div>
        <div className="">
          <p className="text-[12px] font-semibold">Rating</p>
          <div className="flex">
            <Image src="/star2.svg" alt="" width={26} height={26} />
            <div>
              <div className="flex items-center">
                <p className="text-[18px] font-semibold">
                  {selectedMovie.vote_average.toFixed(1)}
                </p>
                <p className="text-[#71717A]">/10</p>
              </div>
              <p className="text-[#71717A] text-[12px]">
                {selectedMovie.popularity.toFixed()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-8">
          <Image
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            alt=""
            width={290}
            height={428}
          />
          <div
            className="w-[760px] h-[428px] bg-cover bg-center flex relative"
            style={{
              backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : undefined,
            }}
          >
            <div className="absolute bottom-5 left-5">
              <TrailerButton id={movieId} />
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col gap-6">
          <div className="flex gap-4">
            {selectedMovie.genres.map((genre: GenreType, index: number) => {
              return (
                <p
                  className="border px-2  rounded-lg text-xs font-semibold"
                  key={index}
                >
                  {genre.name}
                </p>
              );
            })}
          </div>
          <p>{selectedMovie.overview}</p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex gap-6 pb-2">
            <p className="font-bold w-[64px]">Director</p>
            <div className="flex gap-6">
              {casts.crew
                .filter(
                  (array: CrewType) =>
                    array.known_for_department === "Directing"
                )
                ?.map((crew: CrewType, index: number) => {
                  if (index == 0) return <p key={index}>{crew.name}</p>;
                  else return <p key={index}>{crew.name}</p>;
                })
                .slice(0, 3)}
            </div>
          </div>

          <hr />
        </div>

        <div>
          <div className="flex gap-6 pb-2">
            <p className="font-bold w-[64px]">Writers</p>
            <div className="flex gap-6">
              {casts.crew
                .filter(
                  (array: CrewType) => array.known_for_department === "Writing"
                )
                ?.map((crew: CrewType, index: number) => {
                  if (index == 0) return <p key={index}>{crew.name}</p>;
                  else return <p key={index}>{crew.name}</p>;
                })
                .slice(0, 3)}
            </div>
          </div>

          <hr />
        </div>

        <div>
          <div className="flex gap-6 pb-2">
            <p className="font-bold w-[64px]">Stars</p>
            <div className="flex gap-2">
              {casts.cast
                ?.map((star: CastType, index: number) => {
                  if (index == 0) return <p key={index}>{star.name}</p>;
                  else
                    return (
                      <p className="" key={index}>
                        {star.name}
                      </p>
                    );
                })
                .slice(0, 5)}
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div className="flex flex-col max-w-[1068px] gap-8">
        <div className="flex justify-between items-center">
          <p className="text-[24px] font-semibold">More like this</p>
          <Link
            href={`/movies/category/${movieId}/similar`}
            className="hover:underline"
          >
            <div className="flex items-center">
              <p>See more</p> <ArrowRight className="w-4" />
            </div>
          </Link>
        </div>

        <div className="flex gap-8 w-full">
          {moreLikeThis.results
            .slice(0, 5)
            .map((movie: MovieType, index: number) => {
              return (
                <div key={index}>
                  <MovieGenerator
                    movieInfo={movie}
                    className="w-[190px] h-[372px]"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
