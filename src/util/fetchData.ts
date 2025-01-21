import { TOKEN } from "./constants";

export async function fetchData(endpoint: string) {
  const response = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}
