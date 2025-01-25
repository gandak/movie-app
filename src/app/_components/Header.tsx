import { ModeToggle } from "@/components/ui/themeModeChanger";

import { Genres } from "./Genres";
import SearchInput from "./SearchInput";

export const Header = () => {
  return (
    <div className="w-screen pb-6 flex justify-center">
      <div className="flex max-w-[1280px] w-full h-[60px] gap-8 items-center px-4 justify-between">
        <a href="/">
          <img src="/logo.svg" alt="" />
        </a>

        <div className="flex gap-3">
          <Genres />
          <SearchInput /> {/* Client-side search input */}
        </div>

        <ModeToggle />
      </div>
      {/* {searchedResults.length > 0 && (
        <div className="mt-4">
          <ul>
            {searchedResults.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};
