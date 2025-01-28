import { ModeToggle } from "@/components/ui/themeModeChanger";

import { Genres } from "./Genres";
import SearchInput from "./SearchInput";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div>
      <div className="w-screen pb-6 flex justify-center">
        <div className="flex max-w-[1280px] w-full h-[60px] gap-8 items-center px-4 justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="" width={92} height={20} />
          </Link>

          <div className="flex gap-3">
            <Genres />
            <SearchInput />
          </div>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
