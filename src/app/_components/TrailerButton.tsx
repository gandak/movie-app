import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { fetchTrailer } from "@/util/fetchTrailer";
import { MovieId } from "@/util/types";

export async function TrailerButton(movieId: MovieId) {
  const dataTrailer = await fetchTrailer(movieId.id);
  const videoTrailerURL = `https://www.youtube.com/embed/${dataTrailer?.results[0].key}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="cursor-pointer hover:opacity-70 transition-all ease-in-out"
        >
          <Play />
          Watch Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle></DialogTitle>
        <iframe
          width="560"
          height="315"
          src={videoTrailerURL}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
