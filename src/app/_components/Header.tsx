import { ModeToggle } from "@/components/ui/themeModeChanger";
import { Input } from "@/components/ui/input";
import { Genres } from "./Genres";

export const Header = () => {
  return (
    <div className="w-screen pb-6 flex justify-center">
      <div className="flex max-w-[1280px] w-full h-[60px] gap-8 items-center px-4 justify-between">
        <img src="/logo.svg" alt="" />
        <div className="flex gap-3">
          <Genres />
          <Input />
        </div>

        <ModeToggle />
      </div>
    </div>
  );
};
