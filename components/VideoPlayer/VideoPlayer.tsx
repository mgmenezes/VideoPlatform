import { Video } from '@/types/types';


interface VideoPlayerProps {
  video: Video | null;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg h-96 w-full">
        <p className="text-gray-500 text-lg">Selecione um vídeo para assistir</p>
      </div>
    );
  }

  return (
    <div className="video-player-container w-full aspect-video relative">
      <iframe
        src={video.embedUrl}
        title={video.title}
        className="w-full h-full rounded-lg shadow-lg"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      
      <div className="mt-4 bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">{video.title}</h2>
        <div className="flex items-center mt-2">
          <span className="text-gray-600">{video.channelName}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-600">{new Date(video.publishedAt).toLocaleDateString()}</span>
          {video.views && (
            <>
              <span className="mx-2">•</span>
              <span className="text-gray-600">{video.views.toLocaleString()} visualizações</span>
            </>
          )}
        </div>
        <p className="mt-3 text-gray-700">{video.description}</p>
      </div>
    </div>
  );
};

