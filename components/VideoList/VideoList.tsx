import { Video } from "@/types/types";
import { VideoCard } from "../VideoCard";
import { useEffect, useRef } from "react";

interface VideoListProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  isFavorite: (videoId: string) => boolean;
  onToggleFavorite: (video: Video) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
  emptyMessage?: string;
}

export const VideoList: React.FC<VideoListProps> = ({ videos, onSelectVideo, isFavorite, onToggleFavorite, isLoading, hasMore, loadMore, emptyMessage }) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && loadMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loadMore, isLoading]);

  if (!videos.length && !isLoading) {
    return (
      <div className="flex justify-center items-center h-32 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="video-list">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onSelect={onSelectVideo}
            isFavorite={isFavorite(video.id)}
            onToggleFavorite={() => onToggleFavorite(video)}
          />
        ))}
      </div>
    </div>
  );
}
