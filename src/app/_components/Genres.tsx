import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GenreType } from "@/util/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fetchData } from "@/util/fetchData";
import Link from "next/link";

export async function Genres() {
  const genres = await fetchData("/genre/movie/list?language=en");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <ChevronDown /> Genres
        </Button>
      </PopoverTrigger>
      <PopoverContent className="absolute left-[-53px] w-[537px] rounded-lg p-[20px] flex flex-col gap-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h1 className="font-bold leading-none text-[24px]">Genres</h1>
            <p className=" text-4">See lists of movies by genre</p>
          </div>
        </div>
        <hr className="border-[1px] border-[#E4E4E7]" />
        <div className="flex flex-wrap gap-4 ">
          {genres.genres.map((genre: GenreType, index: number) => {
            const movieGenres = genre.id;
            return (
              <Link href={`/movies/genres/${JSON.stringify(movieGenres)}`}>
                <Button
                  variant="outline"
                  className="h-[20px] pl-[10px]  py-[2px] pr-[4px] rounded-lg"
                >
                  <p className="text-xs font-bold ">{genre.name}</p>
                  <ChevronRight />
                </Button>
              </Link>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
