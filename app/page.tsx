'use client';

import  { useState } from 'react';
import { Header } from '@/components/Header';

import { VideoList } from '@/components/VideoList';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Video } from '@/types/types';
import { useVideos } from './hooks/useVideos';
import { useFavorites } from './hooks/useFavorites';

export default function HomePage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { videos, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useVideos();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleFavorite = (video: Video) => {
    if (isFavorite(video.id)) {
      removeFavorite(video.id);
    } else {
      addFavorite(video);
    }
  };

  const isLoading = status === 'pending';

  return (
    <>
      <Header />
      <div className="content-between mx-auto px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoPlayer  video={selectedVideo} />
          </div>
          
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Vídeos Recomendados</h2>
            <VideoList
              videos={videos}
              onSelectVideo={handleVideoSelect}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              hasMore={!!hasNextPage}
              loadMore={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              emptyMessage={isLoading ? "Carregando vídeos..." : "Nenhum vídeo disponível"}
            />
          </div>
        </div>
      </div>
    </>
  );
}