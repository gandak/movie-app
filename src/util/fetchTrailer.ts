import { TOKEN } from "./constants";

export async function fetchTrailer(endpoint: number) {
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

  console.log(dataTrailer);

  return dataTrailer;
}
