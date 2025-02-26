import { Video } from '@/types/types';
import Image from 'next/image';
import { FavoriteButton } from '../FavoriteButton';

export interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
  isFavorite: boolean;
  onToggleFavorite: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      className="video-card group flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      data-testid="video-card"
    >
      <div 
        className="relative cursor-pointer"
        onClick={() => onSelect(video)}
      >
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
          {video.duration}
        </div>
      </div>

      <div className="description video px-3 py-4 flex-grow flex flex-col gap-1">
        <div className="flex justify-between items-start flex-col">
          <h3 
            className="font-medium text-gray-800 line-clamp-2 mb-1 cursor-pointer"
            onClick={() => onSelect(video)}
          >
            {video.title}
          </h3>
          <FavoriteButton
            isFavorite={isFavorite} 
            onClick={() => onToggleFavorite(video)}
          />
        </div>
        
        <p className="text-sm text-gray-500 mb-2">
          {video.channelName}
        </p>
        
        <p className="text-xs text-gray-400">
          {new Date(video.publishedAt).toLocaleDateString()} • {video.views?.toLocaleString() || 0} visualizações
        </p>
      </div>
    </div>
  );
}
