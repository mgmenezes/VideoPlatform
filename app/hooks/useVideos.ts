// hooks/useVideos.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchVideos } from "@/utils/api";
import { VideoFilterOptions } from "@/types/types";

export function useVideos(options: VideoFilterOptions = {}) {
  const { query = "" } = options;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["videos", query],
    queryFn: ({ pageParam = "" }) => {
      return fetchVideos({
        query,
        pageToken: pageParam as string,
        limit: 5,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: "",
  });

  const videos = data?.pages.flatMap((page) => page.videos) || [];
  const totalResults = data?.pages[0]?.totalResults || 0;

  return {
    videos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    totalResults,
  };
}
