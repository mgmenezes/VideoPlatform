import { Video, VideoListResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

const mockVideos: Video[] = [
  {
    id: "video-1",
    title: "JavaScript in 3 hours",
    description:
      "This complete 134-part JavaScript tutorial for beginners will teach you everything you need to know to get started with the JavaScript programming language",
    thumbnailUrl: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
    platform: "youtube",
    publishedAt: new Date('2024-01-15'),
    duration: "3:26:42",
    channelName: "freeCodeCamp.org",
    views: 190000,
  },
  
  {
    id: "video-2",
    title: "React Query in 100 Seconds",
    description:
      "React Query is a tool that makes your data fetching code faster, easier, and more powerful. Learn how to use React Query it in a real application in the Full React Course",
    thumbnailUrl: "https://img.youtube.com/vi/novnyCaa7To/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/novnyCaa7To",
    platform: "youtube",
    publishedAt: new Date('2024-01-15'),
    duration: "2:32",
    channelName: "Fireship",
    views: 3000,
  },
  {
    id: "video-3",
    title: "Tailwind in 100 Seconds",
    description:
      "Tailwind is a utility-first CSS framework for building websites. It takes a functional approach to web design by providing thousands of tiny classes to use directly in your HTML. Learn why web developers love tailwind in this quick breakdown.",
    thumbnailUrl: "https://img.youtube.com/vi/mr15Xzb1Ook/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/mr15Xzb1Ook",
    platform: "youtube",
    publishedAt: new Date('2024-01-15'),
    duration: "2:32",
    channelName: "Fireship",
    views: 3000,
  },
  
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query")?.toLowerCase();
  const pageToken = searchParams.get("pageToken");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  let filteredVideos = mockVideos;
  if (query) {
    filteredVideos = mockVideos.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
    );
  }

  const startIndex = pageToken
    ? filteredVideos.findIndex((video) => video.id === pageToken) + 1
    : 0;
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + limit);

  const nextPageToken =
    startIndex + limit < filteredVideos?.length
      ? filteredVideos[startIndex + limit]?.id
      : undefined;

  const response: VideoListResponse = {
    videos: paginatedVideos,
    nextPageToken,
    totalResults: filteredVideos.length,
  };

  return NextResponse.json(response);
}
