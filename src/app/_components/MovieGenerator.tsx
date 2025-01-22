import { MovieType } from "@/util/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const MovieGenerator = ({ movieInfo }: { movieInfo: MovieType }) => {
  return (
    <Card className="w-[230px] h-[430px] flex flex-col items-center  rounded-lg overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movieInfo?.poster_path}`}
        width={230}
        height={340}
        alt=""
      />
      <CardContent>
        <div className="flex gap-2 justify-center items-center pt-1">
          <span>⭐</span>
          <div className="flex items-center">
            <p className="font-bold">{movieInfo?.vote_average.toFixed(1)}</p>
            <p className="text-[13px]">/10</p>
          </div>
        </div>

        <p className="text-[18px] text-center">{movieInfo?.original_title}</p>
      </CardContent>
    </Card>
  );
};
