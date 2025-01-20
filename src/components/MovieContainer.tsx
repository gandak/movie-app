import { Sparkles } from "lucide-react";

export const MovieContainer = ({ movieInfo }) => {
  return (
    <div className="w-[230px] h-[430px] flex flex-col items-center  bg-[#F4F4F5]">
      <img
        className="w-full h-[340px]"
        src={"https://image.tmdb.org/t/p/original/" + movieInfo?.poster_path}
        alt=""
      />
      <div className="flex gap-2 items-center">
        <Sparkles className="w-[20px] h-[20px]" />
        <p>{movieInfo?.vote_average.toFixed(1)}/10</p>
      </div>

      <p>{movieInfo?.original_title}</p>
    </div>
  );
};
