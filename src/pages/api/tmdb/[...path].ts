import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { path } = req.query;

  if (!path || !Array.isArray(path)) {
    return res.status(400).json({ error: "Invalid path" });
  }

  const apiPath = `/${path.join("/")}`;
  const queryString = new URLSearchParams(
    req.query as Record<string, string>,
  );

  queryString.delete("path");

  const tmdbUrl = `${
    process.env.BASE_URL
  }${apiPath}?${queryString.toString()}`;

  try {
    const response = await fetch(tmdbUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error proxying to TMDB:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch from TMDB API" });
  }
}
