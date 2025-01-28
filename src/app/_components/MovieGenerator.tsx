import { MovieType } from "@/util/types";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const MovieGenerator = ({
  movieInfo,
  className,
}: {
  movieInfo: MovieType;
  className: string;
}) => {
  return (
    <Link href={`/movies/${movieInfo.id}`}>
      <Card
        className={cn(
          ` flex flex-col items-center rounded-lg overflow-hidden bg-[#F4F4F5]`,
          className
        )}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${movieInfo?.poster_path}`}
          width={300}
          height={400}
          alt=""
          // style={{ width: "100%", height: "100%" }}
        />
        <CardContent>
          <div className="flex gap-2 justify-center items-center pt-1 ">
            <span>⭐</span>
            <div className="flex items-center">
              <p className="font-bold">{movieInfo?.vote_average.toFixed(1)}</p>
              <p className="text-[13px]">/10</p>
            </div>
          </div>

          <p className="text-[18px] text-center">{movieInfo?.original_title}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
