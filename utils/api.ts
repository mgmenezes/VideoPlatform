import { VideoFilterOptions, VideoListResponse } from "@/types/types";

export async function fetchVideos(
  options: VideoFilterOptions = {}
): Promise<VideoListResponse> {
  const { query = "", pageToken = "", limit = 5 } = options;

  const url = new URL("/api/videos", window.location.origin);
  if (query) url.searchParams.append("query", query);
  if (pageToken) url.searchParams.append("pageToken", pageToken);
  url.searchParams.append("limit", limit.toString());

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erro ao buscar vídeos: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
}
