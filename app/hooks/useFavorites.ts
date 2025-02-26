import { useState, useEffect, useCallback } from "react";

import { Video } from "@/types/types";
import {
  addToFavorites,
  getFavorites,
  isVideoFavorite,
  removeFromFavorites,
} from "@/utils/localStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Video[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const addFavorite = useCallback((video: Video) => {
    const updatedFavorites = addToFavorites(video);
    setFavorites(updatedFavorites);
  }, []);

  const removeFavorite = useCallback((videoId: string) => {
    const updatedFavorites = removeFromFavorites(videoId);
    setFavorites(updatedFavorites);
  }, []);

  const isFavorite = useCallback((videoId: string) => {
    return isVideoFavorite(videoId);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
