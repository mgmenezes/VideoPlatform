export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  embedUrl: string;
  platform: "youtube" | "vimeo";
  publishedAt: Date;
  duration?: string;
  views?: number;
  channelName?: string;
}

export interface VideoListResponse {
  videos: Video[];
  nextPageToken?: string;
  totalResults?: number;
}

export interface VideoFilterOptions {
  query?: string;
  platform?: "youtube" | "vimeo";
  sort?: "publishedAt" | "views";
  order?: "asc" | "desc";
  pageToken?: string;
  limit?: number;
}

export interface FavoriteContextType {
  favorites: Video[];
  addFavorite: (video: Video) => void;
  removeFavorite: (video: Video) => void;
  isFavorite: (video: Video) => boolean;
}
