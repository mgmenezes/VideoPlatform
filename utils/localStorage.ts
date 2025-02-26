import { Video } from "@/types/types";

const FAVORITES_KEY = "video-platform-favorites";

export function getFavorites(): Video[] {
  try {
    const favoritesJson = localStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error("Erro ao ler favoritos:", error);
    return [];
  }
}

export function saveFavorites(favorites: Video[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Erro ao salvar favoritos:", error);
  }
}

export function addToFavorites(video: Video): Video[] {
  const favorites = getFavorites();
  const isFavorite = favorites.some((fav) => fav.id === video.id);

  if (isFavorite) {
    return favorites;
  }

  const updatedFavorites = [...favorites, video];
  saveFavorites(updatedFavorites);

  return updatedFavorites;
}

export function removeFromFavorites(videoId: string): Video[] {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav.id !== videoId);
  saveFavorites(updatedFavorites);

  return updatedFavorites;
}

export function isVideoFavorite(videoId: string): boolean {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === videoId);
}
