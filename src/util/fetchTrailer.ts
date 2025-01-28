import { TOKEN } from "./constants";

export async function fetchTrailer(endpoint: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${endpoint}/videos`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const dataTrailer = await response.json();
  return dataTrailer;
}
