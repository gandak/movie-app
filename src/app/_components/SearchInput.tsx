"use client";
import { useState } from "react";
import { ArrowRight, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchData } from "@/util/fetchData";
import { MovieType } from "@/util/types";
import Image from "next/image";
import Link from "next/link";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    if (search === "") {
      setSearchResults([]);
      return;
    }

    const searchData = await fetchData(
      `/search/movie?query=${search}&language=en-US`
    );
    setSearchResults(searchData.results || []);
  };

  const clickHandler = () => {
    setSearchResults([]);
    setSearchValue("");
  };

  return (
    <div className="relative w-[355px]">
      <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
        <SearchIcon className="h-4 w-4" />
      </div>
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={searchHandler}
        className="w-full rounded-lg bg-background pl-8"
      />

      {searchResults.length > 0 ? (
        <div className="absolute mt-4 z-10 bg-white p-8 flex flex-col gap-[10px] w-[553px] drop-shadow-xl rounded-xl">
          {searchResults?.slice(0, 5).map((movie: MovieType, index: number) => (
            <div className="flex flex-col gap-3" key={index}>
              <Link
                href={`/movies/${movie?.id}`}
                onClick={() => clickHandler()}
              >
                <div className="flex gap-4 w-full h-[110px] p-2 items-center hover:bg-[#f5f5f5] rounded-lg overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    width={67}
                    height={100}
                    alt=""
                    className="rounded-lg"
                  />
                  <div className="w-full">
                    <h2 className="font-bold text-[20px]">
                      {movie?.original_title}
                    </h2>
                    <div className="flex items-center">
                      <Image src="/star2.svg" alt="" />
                      <div className="flex text-[14px] items-center">
                        <p className="font-semibold">
                          {movie?.vote_average.toFixed(1)}
                        </p>
                        <p className="text-[12px] text-[#71717A]">/10</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p>{movie?.release_date}</p>
                      <div className="flex items-center gap-2">
                        <p className="hover:underline">See more</p>
                        <ArrowRight className="w-[16px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <hr className="border-b-2" />
            </div>
          ))}
          <Link
            href={`/movies/search?searchValue=${searchValue}`}
            onClick={() => clickHandler()}
          >
            <div>See all results for "{searchValue}"</div>
          </Link>
        </div>
      ) : searchValue.length > 1 && searchResults.length == 0 ? (
        <div className="absolute mt-4 z-10 bg-white p-8">
          <p>"Not Found"</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchInput;
