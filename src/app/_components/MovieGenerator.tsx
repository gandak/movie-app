import { MovieType } from "@/util/types";
import Image from "next/image";

export const MovieGenerator = ({ movieInfo }: { movieInfo: MovieType }) => {
  return (
    <div className="w-[230px] h-[430px] flex flex-col items-center  bg-[#F4F4F5] rounded-lg overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movieInfo?.poster_path}`}
        width={230}
        height={340}
        alt=""
      />
      <div className="flex gap-2 items-center pt-1">
        <span>⭐</span>
        <div className="flex items-center">
          <p className="font-bold">{movieInfo?.vote_average.toFixed(1)}</p>
          <p className="text-[13px]">/10</p>
        </div>
      </div>

      <p className="text-[18px]">{movieInfo?.original_title}</p>
    </div>
  );
};
