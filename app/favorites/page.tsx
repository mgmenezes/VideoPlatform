'use client';

import  { useState } from 'react';
import { Header } from '@/components/Header';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoList } from '@/components/VideoList';
import { useFavorites } from '@/app/hooks/useFavorites';
import { Video } from '@/types/types';

export default function FavoritesPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

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

  return (
    <>
      <Header />
      
      <div className="content-between mx-auto px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoPlayer video={selectedVideo} />
          </div>
          
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Meus Favoritos</h2>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-lg p-6 text-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-gray-400 mx-auto mb-4"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <h3 className="text-lg font-medium mb-2">Nenhum favorito ainda</h3>
                <p className="text-gray-600 mb-4">
                  Adicione vídeos aos seus favoritos para vê-los aqui.
                </p>
              </div>
            ) : (
              <VideoList
                videos={favorites}
                onSelectVideo={handleVideoSelect}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                emptyMessage="Nenhum vídeo favorito"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}