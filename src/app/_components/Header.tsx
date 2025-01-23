import { ModeToggle } from "@/components/ui/themeModeChanger";
import { Input } from "@/components/ui/input";
import { Genres } from "./Genres";
import { SearchIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="w-screen pb-6 flex justify-center">
      <div className="flex max-w-[1280px] w-full h-[60px] gap-8 items-center px-4 justify-between">
        <img src="/logo.svg" alt="" />
        <div className="flex gap-3">
          <Genres />
          <div className="relative w-[355px]">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <SearchIcon className="h-4 w-4" />
            </div>
            <Input
              id="search"
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>

        <ModeToggle />
      </div>
    </div>
  );
};
