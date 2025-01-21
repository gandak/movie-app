import { useState, useEffect } from "react";
// import { Home } from "@/components/Home";

import { PopularMovies } from "@/app/_components/PopularMovies";

export default function Home() {
  type MovieType = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: [];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };

  const [movies, setMovies] = useState<MovieType[] | undefined>();
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjNiODAxYjg3OTUwYjIwNDVmZTYyMWRhYmIwZTM4NSIsIm5iZiI6MTczNzM0MjQxOC4zNTY5OTk5LCJzdWIiOiI2NzhkYmRkMmU0NTY2Mzk5YTI2ZTFhNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UuFD5MVGbzMmPxLaCvddS3hvK3vlqx581Vo9YUQdEkM";
  const getMovie = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data?.results) {
      setMovies(data.results[2]);
    }
  };
  useEffect(() => {
    getMovie();
    console.log("getting movie");
  }, []);
  console.log(movies);

  return (
    <div>
      <PopularMovies movieInfo={movies} />
    </div>
  );
}
