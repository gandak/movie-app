import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchData } from "@/util/fetchData";
import { fetchTrailer } from "@/util/fetchTrailer";
import {
  CastType,
  CrewType,
  GenreType,
  MovieId,
  MovieType,
} from "@/util/types";
import Image from "next/image";
import { MovieGenerator } from "../MovieGenerator";

export default async function MovieDetailContent(movieIdParam: MovieId) {
  const movieId = movieIdParam.id;
  const selectedMovie = await fetchData(`/movie/${movieId}?language=en-US`);
  const casts = await fetchData(`/movie/${movieId}/credits?language=en-US`);
  const moreLikeThis = await fetchData(
    `/movie/${movieId}/similar?language=en-US&page=1`
  );

  console.log(moreLikeThis);
  const selectedMovieURL = await fetchTrailer(Number(movieId));

  // const genres = await fetchData("/genre/movie/list?language=en");

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1>{selectedMovie.original_title}</h1>
          <div className="flex">
            <p>{selectedMovie.release_date}</p> ·{" "}
            <p>{!selectedMovie.adult ? "PG" : "R"}</p> ·{" "}
            <p>
              {Math.floor(selectedMovie.runtime / 60)}h{" "}
              {Math.floor(selectedMovie.runtime % 60)}m
            </p>
          </div>
        </div>
        <div>
          <span>⭐</span>
          <p>{selectedMovie.vote_average.toFixed(1)}</p>
          <p>/10</p>
          <p>{selectedMovie.popularity.toFixed()}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-8">
          <Image
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            alt=""
            width={200}
            height={350}
          />
          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedMovieURL.results[0]?.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            {selectedMovie.genres.map((genre: GenreType) => {
              return (
                <p className="border px-2  rounded-lg text-xs font-semibold">
                  {genre.name}
                </p>
              );
            })}
          </div>
          <p>{selectedMovie.overview}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-6">
          <p>Director:</p>
          <div>
            {casts.crew
              .filter(
                (array: CrewType) => array.known_for_department === "Directing"
              )
              ?.map((crew: CrewType) => {
                return <p>{crew.name}</p>;
              })
              .slice(0, 3)}
          </div>
        </div>
        <hr />
        <div className="flex gap-6">
          <p>Writers</p>
          <div className="">
            {casts.crew
              .filter(
                (array: CrewType) => array.known_for_department === "Writing"
              )
              ?.map((crew: CrewType) => {
                return <p>{crew.name}</p>;
              })
              .slice(0, 3)}
          </div>
        </div>
        <hr />
        <div className="flex gap-6">
          <p>Stars</p>
          <div>
            {casts.cast
              ?.map((star: CastType) => {
                return <p>{star.name}</p>;
              })
              .slice(0, 5)}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p>More like this</p>
        <div className="flex gap-4">
          {moreLikeThis.results.slice(0, 5).map((movie: MovieType) => {
            return (
              <div>
                <MovieGenerator movieInfo={movie} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
