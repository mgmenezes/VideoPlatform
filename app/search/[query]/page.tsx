'use client';

import  { useState } from 'react';
import { Header } from '@/components/Header';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoList } from '@/components/VideoList';
import { useVideos } from '@/app/hooks/useVideos';
import { useFavorites } from '@/app/hooks/useFavorites';
import { Video } from '@/types/types';

interface SearchPageProps {
  params: {
    query: string;
  };
}

export default function SearchPage({ params }: SearchPageProps) {
  const searchQuery = decodeURIComponent(params.query);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  
  const { 
    videos, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    status,
    totalResults 
  } = useVideos({ query: searchQuery });
  
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
      <Header searchQuery={searchQuery} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Resultados para <span className="text-blue-600">&quot;{searchQuery}&quot;</span>
          </h1>
          <p className="text-gray-600">
            {totalResults !== undefined ? `${totalResults} vídeos encontrados` : ''}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoPlayer video={selectedVideo} />
          </div>
          
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Resultados da Busca</h2>
            <VideoList
              videos={videos}
              onSelectVideo={handleVideoSelect}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              hasMore={!!hasNextPage}
              loadMore={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              emptyMessage={
                isLoading
                  ? "Buscando vídeos..."
                  : `Nenhum vídeo encontrado para "${searchQuery}"`
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}